import type { ScanConfig } from "../types";

export function getProcessCommand(
  config: ScanConfig,
  inputFilename: string,
  outputFilename: string
): string {
  const { rotate, rotate_var, colorspace, blur, noise, border } = config;
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

  if (thresholdFunc(noise)) {
    args.push(`-attenuate ${noise.toFixed(2)}`);
  }

  args.push(`+noise Gaussian`);

  args.push(outputFilename);

  // join with space
  return args.join(" ");
}
