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
