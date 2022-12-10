declare let self: {
    MAGICA_WASM_LOCATION: string;
}

import wasmURL from "magica/dist/src/imageMagick/compiled/magick.wasm?url";

self.MAGICA_WASM_LOCATION = wasmURL;

export { main } from "magica-re-export";
