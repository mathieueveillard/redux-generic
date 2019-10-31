import { SingleValueActionCreator, makeSingleValueActionCreator } from "./actionCreator";
import { SingleValueReducer, makeSingleValueReducer } from "./reducer";

export interface SingleValueDomain<T> {
  identifier: string | symbol;
  actionCreator: SingleValueActionCreator<T>;
  reducer: SingleValueReducer<T>;
}

export function createSingleValueDomain<T>(initialState: T, discriminator?: string): SingleValueDomain<T> {
  const identifier = discriminator || Symbol();
  const actionCreator: SingleValueActionCreator<T> = makeSingleValueActionCreator(identifier);
  const reducer: SingleValueReducer<T> = makeSingleValueReducer(identifier, initialState);

  return {
    identifier,
    actionCreator,
    reducer
  };
}
