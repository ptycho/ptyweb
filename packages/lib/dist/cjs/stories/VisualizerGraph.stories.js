"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("../components");
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
exports.default = {
    title: 'Visualization/VisualizerGraph',
    component: components_1.VisualizerGraph
};
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (react_1.default.createElement(components_1.VisualizerGraph, Object.assign({}, args)));
exports.Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
exports.Primary.args = {
    data: {
        fmag: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
        phot: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.9, 0.9],
        ex: [0.5, 0.6, 0.7, 0.8, 0.9, 0.9, 0.9, 1, 1],
        iteration_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
};
//# sourceMappingURL=VisualizerGraph.stories.js.map