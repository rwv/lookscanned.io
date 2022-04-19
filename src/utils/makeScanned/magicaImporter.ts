// eslint-disable-next-line @typescript-eslint/no-explicit-any
const global = self as any;

global.tempDouble = undefined;
global.tempI64 = undefined;
global.MAGICA_WASM_LOCATION = "/vendors/magica/magick.wasm";

export { main } from "magica";
