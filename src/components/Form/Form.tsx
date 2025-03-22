/* eslint-disable */
import {
  ChangeEvent,
  cloneElement,
  FormEvent,
  Fragment,
  isValidElement,
  ReactNode,
  useContext,
} from "react";
import { FormContext } from "../FormProvider/context";
import { FormProps } from "./types";

export function Form({ id, children, onSubmit }: FormProps) {
  const { update, state } = useContext(FormContext);

  const applyUpdater = (key: string) => (child: ReactNode, index: number) => {
    if (isValidElement<Record<string, unknown>>(child)) {
      const childId = child.props.id;
      if (typeof childId === "string" && childId.includes(`${id}_`)) {
        return (
          <Fragment key={childId}>
            {cloneElement(child, {
              ...child.props,
              defaultValue: state[id]?.[childId],
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                update(id, childId, e.target.value);
              },
            })}
          </Fragment>
        );
      } else if (child.props.children) {
        return (
          <Fragment key={`${key}_parent_${index}`}>
            {cloneElement(child, {
              ...child.props,
              children: (Array.isArray(child.props.children)
                ? child.props.children
                : [child.props.children]
              ).map(applyUpdater(`${key}_${parent}`)),
            })}
          </Fragment>
        );
      }
    }
    return <Fragment key={`${key}_non_input_${index}`}>{child}</Fragment>;
  };

  const childArr = [children].flatMap(applyUpdater("root"));

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = state[id];
    onSubmit?.(formData);
  };

  return (
    <form id={id} onSubmit={onSubmitForm}>
      {childArr}
    </form>
  );
}
