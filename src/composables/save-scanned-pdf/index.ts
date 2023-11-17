import type { Ref } from 'vue'
import { get } from '@vueuse/core'
import { ref, computed, watch } from 'vue'
import { buildPDF } from '@/utils/pdf-builder/pdf-lib'

interface PDFRenderer {
  renderPage(
    page: number,
    scale: number
  ): Promise<{
    blob: Blob
    height: number
    width: number
    ppi: number
  }>
  getNumPages(): Promise<number>
}

interface ScanRenderer {
  renderPage(image: Blob): Promise<{
    blob: Blob
  }>
}

export function useSaveScannedPDF(
  pdf: Ref<File | undefined>,
  pdfRenderer: Ref<PDFRenderer | undefined>,
  scanRenderer: Ref<ScanRenderer | undefined>,
  scale: Ref<number>
) {
  const finishedPages = ref(0)
  const totalPages = ref(0)
  const progress = computed(() => {
    if (totalPages.value === 0) {
      return 0
    }
    return finishedPages.value / totalPages.value
  })

  const saving = ref(false)
  const scannedPDF = ref<File | undefined>(undefined)
  const outputFilename = computed(() => {
    const originalFilename = pdf.value?.name ?? 'doc.pdf'
    const filename = `${originalFilename.replace(/\.[^/.]+$/, '')}-scan.pdf`
    return filename
  })

  const reset = () => {
    finishedPages.value = 0
    totalPages.value = 0
    scannedPDF.value = undefined
    saving.value = false
  }

  watch(pdfRenderer, reset)
  watch(scanRenderer, reset)
  watch(scale, reset)

  const save = async () => {
    try {
      finishedPages.value = 0
      totalPages.value = 0
      saving.value = true

      const pdf = get(pdfRenderer)
      const scan = get(scanRenderer)
      const scale_ = get(scale)

      if (!pdf || !scan) {
        throw new Error('No PDF or Scan Renderer')
      }

      const numPages = await pdf.getNumPages()

      totalPages.value = numPages

      // generate pdf pages 1...n
      const pages = Array.from({ length: numPages }, (_, i) => i + 1)
      const scanPages = await Promise.all(
        pages.map(async (page) => {
          const { blob: pdfPage, height, width } = await pdf.renderPage(page, scale_)
          const { blob: scanPage } = await scan.renderPage(pdfPage)
          finishedPages.value += 1
          return {
            blob: scanPage,
            width,
            height,
            ppi: scale_ * 72
          }
        })
      )

      // generate pdf from scan pages
      const pdfDocument = await buildPDF(scanPages)

      scannedPDF.value = new File([pdfDocument], outputFilename.value, {
        type: 'application/pdf'
      })

      return pdfDocument
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      saving.value = false
    }
  }

  return { save, progress, saving, scannedPDF }
}
