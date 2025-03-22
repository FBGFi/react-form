import type { Preview } from "@storybook/react";
import { FormProvider } from "../src/components/FormProvider/FormProvider";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <FormProvider>
        <Story />
      </FormProvider>
    ),
  ],
};

export default preview;
