import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/pdf'
import { standardFontDataFactory } from './standardFontDataFactory'

export interface PDFPageInfo {
  blob: Blob
  page: number
  height: number
  width: number
  scale: number
  ppi: number
}

export interface PDFInfoType {
  source: string
  filename: string
}

export interface PDFRenderer {
  renderPage(page: number, scale: number): Promise<PDFPageInfo>
  getNumPages(): Promise<number>
}

export class PDF implements PDFRenderer {
  private readonly pdf: File

  private pdfDocument?: PDFDocumentProxy
  private readonly initPromise: Promise<void>
  private readonly pagePromises: Map<string, Promise<PDFPageInfo>> = new Map()

  constructor(pdf: File) {
    this.pdf = pdf
    this.initPromise = this.init()
  }

  async init() {
    const { getDocument } = await import('./getDocument')
    const url = URL.createObjectURL(this.pdf)
    const pdfDocument = await getDocument({
      url: url,
      StandardFontDataFactory: standardFontDataFactory
    }).promise
    this.pdfDocument = pdfDocument
  }

  private async getDocument(): Promise<PDFDocumentProxy> {
    await this.initPromise
    if (!this.pdfDocument) {
      throw new Error('PDF document is not initialized')
    }
    return this.pdfDocument
  }

  async getNumPages(): Promise<number> {
    await this.initPromise
    if (!this.pdfDocument) {
      throw new Error('PDF document is not initialized')
    }

    return this.pdfDocument.numPages
  }

  async renderPage(page: number, scale: number): Promise<PDFPageInfo> {
    const promise = this.pagePromises.get(`${page}-${scale}`)
    if (promise) {
      return await promise
    }

    const pageInfoPromise = this.renderPageRaw(page, scale)
    this.pagePromises.set(`${page}-${scale}`, pageInfoPromise)

    return await pageInfoPromise
  }

  private async renderPageRaw(page: number, scale: number): Promise<PDFPageInfo> {
    await this.initPromise

    const ppi = scale * 72
    const pdfDocument = await this.getDocument()
    const pdfPage = await pdfDocument.getPage(page)
    const viewport = pdfPage.getViewport({ scale })
    const width = viewport.width
    const height = viewport.height

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Canvas context is null')
    }

    const renderTask = pdfPage.render({
      canvasContext: ctx,
      viewport
    })
    await renderTask.promise

    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Canvas to Blob failed'))
        }
      })
    })

    canvas.remove()

    const pageInfo = {
      blob,
      page,
      height,
      width,
      scale,
      ppi
    }

    pdfPage.cleanup()

    return pageInfo
  }
}
