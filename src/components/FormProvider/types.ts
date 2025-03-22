import { PropsWithChildren } from "react";

export type FormProviderProps = PropsWithChildren;

export interface FormState {
  [inputId: string]: string;
}

export interface FormProviderState {
  [formId: string]: FormState;
}

export type FormStateUpdater = (
  formId: string,
  inputId: string,
  value: string,
) => void;

export type OnFormStateUpdateCallback = (state: FormState) => void;

export type FormStateSubscriber = (
  formId: string,
  onUpdate: OnFormStateUpdateCallback,
) => void;

export interface FormStateObservers {
  [formId: string]: OnFormStateUpdateCallback[];
}

export type FormStateUnsubscriber = (
  formId: string,
  onUpdate: OnFormStateUpdateCallback,
) => void;
