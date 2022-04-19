import getPdfjsLib from "./getPdfjsLib";

type pdfjsLibType = Awaited<ReturnType<typeof getPdfjsLib>>;

let loadedPdfjsLib: pdfjsLibType | undefined = undefined;

export default async function getSharedPdfjsLib(): Promise<pdfjsLibType> {
  // If loaded, return the loaded version
  if (loadedPdfjsLib) {
    return loadedPdfjsLib;
  }

  loadedPdfjsLib = await getPdfjsLib();
  return loadedPdfjsLib;
}
