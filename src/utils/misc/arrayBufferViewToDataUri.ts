export default async (abv: ArrayBufferView, mime: string): Promise<string> => {
  const imageBlob = new Blob([abv], { type: mime });
  const dataUri: string = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result as string);
    reader.readAsDataURL(imageBlob);
  });
  return dataUri;
};
