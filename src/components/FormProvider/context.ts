import { createContext, useContext, useEffect } from "react";
import {
  FormProviderState,
  FormStateSubscriber,
  FormStateUnsubscriber,
  FormStateUpdater,
  OnFormStateUpdateCallback,
} from "./types";

export const FormContext = createContext<{
  state: FormProviderState;
  update: FormStateUpdater;
  subscribe: FormStateSubscriber;
  unsubscribe: FormStateUnsubscriber;
}>({
  state: {},
  update: () => null,
  subscribe: () => null,
  unsubscribe: () => null,
});

interface ReactFormProps {
  formId: string;
  onUpdate?: OnFormStateUpdateCallback;
}
export function useReactForm({ onUpdate, formId }: ReactFormProps) {
  const { state, subscribe, unsubscribe } = useContext(FormContext);

  useEffect(() => {
    if (!onUpdate) return;
    subscribe(formId, onUpdate);
    return () => {
      unsubscribe(formId, onUpdate);
    };
  }, [formId, onUpdate]);

  return state[formId];
}
