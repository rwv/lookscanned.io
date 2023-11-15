import type { ScanRenderer } from "../types";

type RenderPageResult = Awaited<ReturnType<ScanRenderer["renderPage"]>>;
type RenderPageParams = Parameters<ScanRenderer["renderPage"]>;

export class ScanCacher implements ScanRenderer {
  private readonly cache = new Map<Blob, Promise<RenderPageResult>>();
  private readonly renderer: ScanRenderer;

  constructor(renderer: ScanRenderer) {
    this.renderer = renderer;
  }

  async renderPage(
    image: RenderPageParams[0],
    options?: RenderPageParams[1]
  ): Promise<RenderPageResult> {
    try {
      const result = await this.cache.get(image);
      if (!result) {
        throw new Error("Cache miss");
      }
      return result;
    } catch (e) {
      const resultPromise = this.renderer.renderPage(image, options);
      this.cache.set(image, resultPromise);
      return resultPromise;
    }
  }
}
