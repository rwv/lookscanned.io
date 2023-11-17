interface IFile {
  name: string
  content: ArrayBufferView
}

export function ABVToIFile(abv: ArrayBufferView, filename: string): IFile {
  const file: IFile = {
    name: filename,
    content: abv
  }
  return file
}

export async function BlobToIFile(blob: Blob, filename: string): Promise<IFile> {
  const buffer = new Uint8Array(await blob.arrayBuffer())
  const file = ABVToIFile(buffer, filename)
  return file
}
