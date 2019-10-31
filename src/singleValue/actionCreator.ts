import { SingleValueAction } from "./action";

export type SingleValueActionCreator<T> = (payload: T, type?: string) => SingleValueAction<T>;

export function makeSingleValueActionCreator<T>(domain: string | symbol): SingleValueActionCreator<T> {
  return function actionCreator(payload: T, type?: string): SingleValueAction<T> {
    return {
      type: type || "UPDATE_SINGLE_VALUE_ACTION",
      payload,
      meta: {
        singleValue: true,
        domain,
        type: "UPDATE_SINGLE_VALUE_ACTION"
      }
    };
  };
}
