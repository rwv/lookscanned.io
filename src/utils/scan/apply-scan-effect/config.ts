export const colorspaces = ["gray", "sRGB"] as const;

export interface ScanConfig {
  rotate: number;
  rotate_var: number;
  colorspace: typeof colorspaces[number];
  blur: number;
  attenuate: number;
  noise: string;
  border: boolean;
  scale: number;
}

export const defaultConfig: ScanConfig = {
  rotate: 1,
  rotate_var: 0.5,
  colorspace: "gray",
  blur: 0.5,
  attenuate: 0.25,
  noise: "Gaussian",
  border: false,
  scale: 1,
};
