export const colorspaces = ["gray", "sRGB"] as const;
export interface ProcessConfig {
  rotate: number;
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
  const { rotate, colorspace, blur, attenuate, noise, border } = config;
  const thresholdFunc = (value: number) => !(value > -0.1 && value < 0.1);
  const args: string[] = [];
  args.push("convert");
  args.push(inputFilename);

  if (thresholdFunc(border) == true) {
    args.push("-bordercolor black -border 1 -bordercolor white -border 1");
  }

  if (thresholdFunc(rotate)) {
    args.push(`-distort SRT ${rotate.toFixed(2)} +repage`);
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
