export const complexAbs = (real: number, imag: number): number =>  {
  return Math.hypot(real, imag) // sqrt ( real ** 2 + imag ** 2 )
}

export const complexAngle = (real: number, imag: number): number => {
  return Math.atan(imag/real)
}