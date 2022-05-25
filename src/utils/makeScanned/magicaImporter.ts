// eslint-disable-next-line @typescript-eslint/no-explicit-any
const global = self as any;

import wasmURL from "magica/dist/src/imageMagick/compiled/magick.wasm?url";

global.MAGICA_WASM_LOCATION = wasmURL;

export { main } from "magica-re-export";
