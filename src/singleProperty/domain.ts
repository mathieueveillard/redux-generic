import { SinglePropertyActionCreator, makeSinglePropertyActionCreator } from "./actionCreator";
import { SinglePropertyReducer, makeSinglePropertyReducer } from "./reducer";

export interface SinglePropertyDomain<T> {
  identifier: string | symbol;
  actionCreator: SinglePropertyActionCreator<T>;
  reducer: SinglePropertyReducer<T>;
}

export function createSinglePropertyDomain<T>(initialState: T, discriminator?: string): SinglePropertyDomain<T> {
  const identifier = discriminator || Symbol();
  const actionCreator: SinglePropertyActionCreator<T> = makeSinglePropertyActionCreator(identifier);
  const reducer: SinglePropertyReducer<T> = makeSinglePropertyReducer(identifier, initialState);

  return {
    identifier,
    actionCreator,
    reducer
  };
}
