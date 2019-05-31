import { GenericActionCreators, makeGenericActionCreators } from "./actionCreators";
import { GenericReducer, makeGenericReducer } from "./reducer";

export interface GenericDomain<T> {
  identifier: string | symbol;
  actionCreators: GenericActionCreators<T>;
  reducer: GenericReducer<T>;
}

export function createGenericDomain<T>(discriminator?: string): GenericDomain<T> {
  const identifier = discriminator || Symbol();
  return {
    identifier,
    actionCreators: makeGenericActionCreators(identifier),
    reducer: makeGenericReducer(identifier)
  };
}
