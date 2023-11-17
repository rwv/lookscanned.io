import pdfJsWorkerURL from 'pdfjs-dist/build/pdf.worker.min.js?url'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
GlobalWorkerOptions.workerSrc = pdfJsWorkerURL

export { getDocument }
