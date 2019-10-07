import { SinglePropertyAction } from "./action";

export type SinglePropertyActionCreator<T> = (payload: T, type?: string) => SinglePropertyAction<T>;

export function makeSinglePropertyActionCreator<T>(domain: string | symbol): SinglePropertyActionCreator<T> {
  return function actionCreator(payload: T, type?: string): SinglePropertyAction<T> {
    return {
      type: type || "UPDATE_SINGLE_PROPERTY_ACTION",
      payload,
      meta: {
        singleProperty: true,
        domain,
        type: "UPDATE_SINGLE_PROPERTY_ACTION"
      }
    };
  };
}
