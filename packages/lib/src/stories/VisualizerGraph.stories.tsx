import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {VisualizerGraph} from "../components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Visualization/VisualizerGraph',
  component: VisualizerGraph
} as ComponentMeta<typeof VisualizerGraph>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VisualizerGraph> = (args) => (
  <VisualizerGraph
    {...args}
  />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  data: {
    fmag: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
    phot: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.9, 0.9],
    ex: [0.5, 0.6, 0.7, 0.8, 0.9, 0.9, 0.9, 1, 1],
    iteration_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  }
};
