import { Reducer } from "redux";
import { SinglePropertyAction } from "./action";

export type SinglePropertyReducer<T> = Reducer<T, SinglePropertyAction<T>>;

export function makeSinglePropertyReducer<T>(domain: string | symbol, initialState: T): SinglePropertyReducer<T> {
  return function reducer(state: T = initialState, action: SinglePropertyAction<T>): T {
    if (action.meta === undefined || !action.meta.singleProperty || action.meta.domain !== domain) {
      return state;
    }
    if (action.meta.type === "UPDATE_SINGLE_PROPERTY_ACTION") {
      return action.payload;
    }
    return state;
  };
}
