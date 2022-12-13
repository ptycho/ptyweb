"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complexAngle = exports.complexAbs = void 0;
const complexAbs = (real, imag) => {
    return Math.hypot(real, imag); // sqrt ( real ** 2 + imag ** 2 )
};
exports.complexAbs = complexAbs;
const complexAngle = (real, imag) => {
    return Math.atan(imag / real);
};
exports.complexAngle = complexAngle;
//# sourceMappingURL=mathUtil.js.map