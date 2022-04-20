import type { ProcessConfig } from "./processConfig";

export const defaultConfig: ProcessConfig = {
  rotate: 1.0,
  colorspace: "gray",
  blur: 0.5,
  attenuate: 0.25,
  noise: "Gaussian",
  border: true
};
