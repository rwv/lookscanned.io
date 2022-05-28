import type { ScanConfig } from "./ScanConfig";

export const defaultConfig: ScanConfig = {
  rotate: 1,
  rotate_var: 0.5,
  colorspace: "gray",
  blur: 0.5,
  attenuate: 0.25,
  noise: "Gaussian",
  border: false,
};
