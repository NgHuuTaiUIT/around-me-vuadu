import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Indicators } from "@/components/indicators";

export default {
  title: "CoronaApp/Indicators",
  component: Indicators,
  argTypes: {
    backgroundColor: { control: "color" }
  }
} as ComponentMeta<typeof Indicators>;

const Template: ComponentStory<typeof Indicators> = args => (
  <Indicators {...args} />
);

export const Default = Template.bind({});
Default.args = {};
