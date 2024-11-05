export const colorspaces = ['gray', 'sRGB'] as const

export interface ScanConfig {
  rotate: number
  rotate_var: number
  colorspace: (typeof colorspaces)[number]
  blur: number
  noise: number
  border: boolean
  scale: number
  brightness: number
  yellowish: number
  contrast: number
  output_format: 'image/png' | 'image/jpeg'
}

export const defaultConfig: ScanConfig = {
  rotate: 1,
  rotate_var: 0.5,
  colorspace: 'gray',
  blur: 0.5,
  noise: 0.25,
  border: false,
  scale: 2,
  brightness: 1,
  yellowish: 0,
  contrast: 1,
  output_format: 'image/jpeg'
}
