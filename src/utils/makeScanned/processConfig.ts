export const colorspaces = ["gray", "sRGB"] as const;
export interface ProcessConfig {
  rotate: number;
  rotate_var: number;
  colorspace: typeof colorspaces[number];
  blur: number;
  attenuate: number;
  noise: string;
  background: string;
  punchHoles: string;
}

export function getProcessCommand(
  config: ProcessConfig,
  inputFilename: string,
  outputFilename: string
): string {
  const { rotate, rotate_var, colorspace, blur, attenuate, noise, background, punchHoles } =
    config;
  const thresholdFunc = (value: number) => !(value > -0.05 && value < 0.05);
  const args: string[] = [];
  args.push("convert");
  args.push(inputFilename);

  // configure appearance of border and punch holes
  if (background == "White") {

    if (punchHoles != "None") {
      args.push("-stroke white -fill white -strokewidth 1");
    }

  } else if (background == "Black Border") {

    args.push("-bordercolor black -border 1");

    if (punchHoles != "None") {
      args.push("-stroke black -fill white -strokewidth 1");
    }

  } else if (background == "Black") {

    if (punchHoles != "None") {
      args.push("-stroke black -fill black -strokewidth 1");
    }
  }


  // draw punch holes
  if (punchHoles == "A4") {

    // top hole
    args.push("-draw 'translate 67,615 circle 0,0 18,0'");

    // bottom hole
    args.push("-draw 'translate 67,1069 circle 0,0 18,0'");

  } else if (punchHoles == "Letter") {

    // top hole
    args.push("-draw 'translate 72,188 circle 0,0 22,0'");

    // middle hole
    args.push("-draw 'translate 72,795 circle 0,0 22,0'");

    // bottom hole
    args.push("-draw 'translate 72,1400 circle 0,0 22,0'");
  }


  const randomRotate = (Math.random() * 2 - 1) * rotate_var + rotate;

  if (thresholdFunc(randomRotate)) {

    if (background == "Black") {
      args.push("-background black");
    } else {
      args.push("-background white");
    }

    args.push("-virtual-pixel background");
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
