import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Visualizer} from "../components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Visualization/Visualizer',
  component: Visualizer
} as ComponentMeta<typeof Visualizer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Visualizer> = (args) => (
  <Visualizer
    {...args}
  />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "Example reconstruction",
  data: {
    imaginary: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    real: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    pixel_size: 1
  }
};
