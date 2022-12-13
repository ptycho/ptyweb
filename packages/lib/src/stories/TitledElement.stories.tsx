import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {TitledElement} from "../components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Structure/TitledElement',
  component: TitledElement
} as ComponentMeta<typeof TitledElement>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TitledElement> = (args) => (
  <TitledElement
    {...args}
    children={
      <div>
        <p>This is an example</p>
        <p>Child component</p>
      </div>
    }
  />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "Title"
};
