export const complexAbs = (real, imag) => {
    return Math.hypot(real, imag); // sqrt ( real ** 2 + imag ** 2 )
};
export const complexAngle = (real, imag) => {
    return Math.atan(imag / real);
};
//# sourceMappingURL=mathUtil.js.map