import { applyScanEffect } from './apply-scan-effect'
import type { ScanConfig } from './types'
import type { ScanRenderer } from '../types'

export class MagicaScanner implements ScanRenderer {
  config: ScanConfig

  constructor(config: ScanConfig) {
    this.config = config
  }

  async renderPage(
    image: Blob,
    options?: {
      signal?: AbortSignal
    }
  ): Promise<{
    blob: Blob
  }> {
    const scannedBlob = await applyScanEffect(
      {
        image: image,
        config: JSON.parse(JSON.stringify(this.config))
      },
      options?.signal
    )

    return { blob: scannedBlob }
  }
}
