import type { ScanRenderer } from '../types'

type RenderPageResult = Awaited<ReturnType<ScanRenderer['renderPage']>>
type RenderPageParams = Parameters<ScanRenderer['renderPage']>

export class ScanCacher implements ScanRenderer {
  private readonly cache = new Map<Blob, RenderPageResult>()
  private readonly renderer: ScanRenderer

  constructor(renderer: ScanRenderer) {
    this.renderer = renderer
  }

  async renderPage(
    image: RenderPageParams[0],
    options?: RenderPageParams[1]
  ): Promise<RenderPageResult> {
    // TODO: we should cache Promise<Blob> instead of Blob
    // however, we need to make sure that the Promise is not rejected
    // otherwise, the cache will be stuck with a rejected Promise
    // some mysterious error happens when we try to cache Promise<Blob>

    const cached = this.cache.get(image)
    if (cached) {
      return cached
    }

    const result = await this.renderer.renderPage(image, options)
    this.cache.set(image, result)
    return result
  }
}
