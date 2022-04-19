export default (dataUri: string): Uint8Array => {
  const base64 = dataUri.split(",")[1];
  const binary_string = self.atob(base64);
  const len = binary_string.length;
  const abv = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    abv[i] = binary_string.charCodeAt(i);
  }
  return abv;
};
