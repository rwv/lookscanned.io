// eslint-disable-next-line @typescript-eslint/no-explicit-any
const global = self as any;

global.MAGICA_WASM_LOCATION = "/vendors/magica/magick.wasm";

export { main } from "magica-re-export";
