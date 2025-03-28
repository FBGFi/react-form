import { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";
import { useReactForm } from "../FormProvider/context";
import { FormState } from "../FormProvider/types";

export default {
  title: "Form",
  component: Form,
  args: {
    id: "example_form",
    onSubmit: (state) => console.log("onSubmit", state),
    children: (
      <>
        <input id="example_form_text_input" />
        <input id="example_form_number_input" type="number" />
        <div>
          <input id="example_form_nested_input" />
        </div>
        <button>Submit</button>
      </>
    ),
  },
  decorators: [
    (Story) => {
      const onUpdate = (state: FormState) => {
        console.log(state);
      };

      const state = useReactForm({ formId: "example_form", onUpdate });
      console.log("this should not log every render: ", state);
      return <Story />;
    },
  ],
} satisfies Meta<typeof Form>;

export const Primary: StoryObj<typeof Form> = {};
