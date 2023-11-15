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
    const cached = this.cache.get(image);
    if (cached) {
      try {
        const result = await cached;
        return result;
      } catch (e) {
        if (
          (e as Error).name === "AbortError" ||
          (e as Error).message === "Aborted"
        ) {
          this.cache.delete(image);
          const resultPromise = this.renderer.renderPage(image, options);
          this.cache.set(image, resultPromise);
          return await resultPromise;
        }
        throw e;
      }
    }

    const resultPromise = this.renderer.renderPage(image, options);
    this.cache.set(image, resultPromise);
    return await resultPromise;
  }
}
