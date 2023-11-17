export interface StandardFontDataFactoryType {
  fetch: (req: { filename: string }) => Promise<Uint8Array>
}

export class standardFontDataFactory {
  async fetch(req: { filename: string }): Promise<Uint8Array> {
    const { filename } = req
    const url = getFontURL(filename)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${url}`)
    }

    return new Uint8Array(await response.arrayBuffer())
  }
}

function getFontURL(filename: string) {
  if (filename.endsWith('.pfb')) {
    const base = filename.slice(0, -4)

    return new URL(
      `../../../../node_modules/pdfjs-dist/standard_fonts/${base}.pfb`,
      import.meta.url
    ).href
  }

  if (filename.endsWith('.ttf')) {
    const base = filename.slice(0, -4)

    return new URL(`../../../node_modules/pdfjs-dist/standard_fonts/${base}.ttf`, import.meta.url)
      .href
  }

  throw new Error(`Unknown font filename: ${filename}`)
}
