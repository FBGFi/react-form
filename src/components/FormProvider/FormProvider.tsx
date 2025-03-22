/* eslint-disable */
import { useEffect, useRef } from "react";
import {
  FormProviderProps,
  FormProviderState,
  FormStateObservers,
  FormStateSubscriber,
  FormStateUpdater,
} from "./types";
import { FormContext } from "./context";

export function FormProvider({ children }: FormProviderProps) {
  const observers = useRef<FormStateObservers>({});
  const stateRef = useRef<FormProviderState>({});

  const update: FormStateUpdater = (formId, inputId, value) => {
    if (!stateRef.current[formId]) {
      stateRef.current[formId] = { [inputId]: value };
    } else {
      stateRef.current[formId][inputId] = value;
    }
    observers.current[formId]?.forEach((observer) =>
      observer(stateRef.current[formId]),
    );
  };

  const subscribe: FormStateSubscriber = (formId, onUpdate) => {
    console.log("subscribed");
    if (!observers.current[formId]) {
      observers.current[formId] = [onUpdate];
    } else {
      observers.current[formId].push(onUpdate);
    }
  };

  // TODO this does cleanup incorrectly, after HMR observers are not readded
  useEffect(() => () => {
    console.log("cleaning up");
    observers.current = {};
  });

  return (
    <FormContext.Provider
      value={{ state: stateRef.current, update, subscribe }}>
      {children}
    </FormContext.Provider>
  );
}
