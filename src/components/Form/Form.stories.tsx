import { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";
import { useReactForm } from "../FormProvider/context";
import { FormState } from "../FormProvider/types";

export default {
  title: "Form",
  component: Form,
  args: {
    id: "example_form",
    children: (
      <>
        <input id="example_form_text_input" />
        <input id="example_form_number_input" type="number" />
        <div>
          <input id="example_form_nested_input" />
        </div>
      </>
    ),
  },
  decorators: [
    (Story) => {
      const { subscribe } = useReactForm();

      const onUpdate = (state: FormState) => {
        console.log(state);
      };

      subscribe("example_form", onUpdate);

      return <Story />;
    },
  ],
} satisfies Meta<typeof Form>;

export const Primary: StoryObj<typeof Form> = {};
