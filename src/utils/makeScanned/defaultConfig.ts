import type { ProcessConfig } from "./processConfig";

export const defaultConfig: ProcessConfig = {
  rotate: 1,
  rotate_var: 0.5,
  colorspace: "gray",
  blur: 0.5,
  attenuate: 0.25,
  noise: "Gaussian",
  background: "White",
  punchHoles: "None",
};
