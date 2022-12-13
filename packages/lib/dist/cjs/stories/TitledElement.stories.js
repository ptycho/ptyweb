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
    title: 'Structure/TitledElement',
    component: components_1.TitledElement
};
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (react_1.default.createElement(components_1.TitledElement, Object.assign({}, args, { children: react_1.default.createElement("div", null,
        react_1.default.createElement("p", null, "This is an example"),
        react_1.default.createElement("p", null, "Child component")) })));
exports.Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
exports.Primary.args = {
    title: "Title"
};
//# sourceMappingURL=TitledElement.stories.js.map