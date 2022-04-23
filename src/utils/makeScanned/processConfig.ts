export const colorspaces = ["gray", "sRGB"] as const;
export interface ProcessConfig {
  rotate: number;
  rotate_var: number;
  colorspace: typeof colorspaces[number];
  blur: number;
  attenuate: number;
  noise: string;
  border: boolean;
}

export function getProcessCommand(
  config: ProcessConfig,
  inputFilename: string,
  outputFilename: string
): string {
  const { rotate, rotate_var, colorspace, blur, attenuate, noise, border } =
    config;
  const thresholdFunc = (value: number) => !(value > -0.05 && value < 0.05);
  const args: string[] = [];
  args.push("convert");
  args.push(inputFilename);

  if (border) {
    args.push("-bordercolor black -border 1");
  }

  const randomRotate = (Math.random() * 2 - 1) * rotate_var + rotate;

  if (thresholdFunc(randomRotate)) {
    args.push("-background white -virtual-pixel background");
    args.push(`-distort SRT ${randomRotate.toFixed(2)}`);
    args.push("+repage");
  }

  args.push(`-colorspace ${colorspace}`);

  if (thresholdFunc(blur)) {
    args.push(`-blur 0x${blur.toFixed(2)}`);
  }

  if (thresholdFunc(attenuate)) {
    args.push(`-attenuate ${attenuate.toFixed(2)}`);
  }

  args.push(`+noise ${noise}`);

  args.push(outputFilename);

  // join with space
  return args.join(" ");
}
