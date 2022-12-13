import React from 'react';
import { TitledElement } from "../components";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Structure/TitledElement',
    component: TitledElement
};
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (React.createElement(TitledElement, Object.assign({}, args, { children: React.createElement("div", null,
        React.createElement("p", null, "This is an example"),
        React.createElement("p", null, "Child component")) })));
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    title: "Title"
};
//# sourceMappingURL=TitledElement.stories.js.map