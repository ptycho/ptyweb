"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitledElement = void 0;
const react_1 = __importDefault(require("react"));
const TitledElement = ({ title, children }) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("span", { className: "titledElement__title" }, title),
        children));
};
exports.TitledElement = TitledElement;
//# sourceMappingURL=TitledElement.js.map