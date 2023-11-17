import { applyScanEffect } from './apply-scan-effect'

onmessage = async function (e: MessageEvent<Parameters<typeof applyScanEffect>[0]>) {
  postMessage(await applyScanEffect(e.data))
}
