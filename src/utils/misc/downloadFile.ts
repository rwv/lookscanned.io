export default function (abv: ArrayBufferView, mime: string, filename: string) {
  const blob = new Blob([abv], { type: mime });
  const objectURL = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = filename;
  link.href = objectURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  link.remove();

  window.URL.revokeObjectURL(objectURL);
}
