import type { IFile } from "magica-re-export";

export const generateIFile = (abv: ArrayBufferView, filename: string) => {
  const file: IFile = {
    name: filename,
    content: abv,
  };
  return file;
};
