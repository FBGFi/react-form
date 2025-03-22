import { PropsWithChildren } from "react";
import { FormState } from "../FormProvider/types";

export interface FormProps extends PropsWithChildren {
  id: string;
  onSubmit?: (state: FormState | undefined) => void;
}
