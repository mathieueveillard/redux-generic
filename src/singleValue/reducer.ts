import { Reducer } from "redux";
import { SingleValueAction } from "./action";

export type SingleValueReducer<T> = Reducer<T, SingleValueAction<T>>;

export function makeSingleValueReducer<T>(domain: string | symbol, initialState: T): SingleValueReducer<T> {
  return function reducer(state: T = initialState, action: SingleValueAction<T>): T {
    if (action.meta === undefined || !action.meta.singleValue || action.meta.domain !== domain) {
      return state;
    }
    if (action.meta.type === "UPDATE_SINGLE_VALUE_ACTION") {
      return action.payload;
    }
    return state;
  };
}
