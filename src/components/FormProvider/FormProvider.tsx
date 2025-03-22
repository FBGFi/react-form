/* eslint-disable */
import { useEffect, useRef } from "react";
import {
  FormProviderProps,
  FormProviderState,
  FormStateObservers,
  FormStateSubscriber,
  FormStateUnsubscriber,
  FormStateUpdater,
  OnFormStateUpdateCallback,
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
    if (!observers.current[formId]) {
      observers.current[formId] = [onUpdate];
    } else {
      observers.current[formId].push(onUpdate);
    }
  };

  const unsubscribe: FormStateUnsubscriber = (formId, onUpdate) => {
    if (observers.current[formId]) {
      observers.current[formId] = observers.current[formId].reduce<
        OnFormStateUpdateCallback[]
      >((newObservers, observer) => {
        if (observer !== onUpdate) {
          newObservers.push(observer);
        }
        return newObservers;
      }, []);
    }
  };

  useEffect(
    () => () => {
      observers.current = {};
    },
    [],
  );

  return (
    <FormContext.Provider
      value={{ state: stateRef.current, update, subscribe, unsubscribe }}>
      {children}
    </FormContext.Provider>
  );
}
