/* eslint-disable */
import { cloneElement, Fragment, isValidElement, ReactNode } from "react";
import { useReactForm } from "../FormProvider/context";
import { FormProps } from "./types";

export function Form({ id, children }: FormProps) {
  const { update } = useReactForm();

  const applyUpdater = (key: string) => (child: ReactNode, index: number) => {
    if (isValidElement(child)) {
      if (child.props?.id?.includes(`${id}_`)) {
        return (
          <Fragment key={child.props.id}>
            {cloneElement(child, {
              ...child.props,
              onChange: (e) => {
                update(id, child.props.id, e.target.value);
              },
            })}
          </Fragment>
        );
      } else if (child.props?.children) {
        return <Fragment key={`${key}_parent_${index}`}>
          {cloneElement(child, {
            ...child.props,
            children: (child.props.children.length ? child.props.children : [child.props.children]).map(applyUpdater(`${key}_${parent}`))
          })}
        </Fragment>
      }

    }
    return <Fragment key={`${key}_non_input_${index}`}>{child}</Fragment>;
  }

  const childArr = [children].flatMap(applyUpdater("root"));
  return <form id={id}>{childArr}</form>;
}
