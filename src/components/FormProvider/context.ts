import { createContext, useContext } from "react";
import {
  FormProviderState,
  FormStateSubscriber,
  FormStateUpdater,
} from "./types";

export const FormContext = createContext<{
  state: FormProviderState;
  update: FormStateUpdater;
  subscribe: FormStateSubscriber;
}>({ state: {}, update: () => null, subscribe: () => null });

export function useReactForm() {
  return useContext(FormContext);
}
