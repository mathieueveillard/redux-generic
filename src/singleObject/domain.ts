import { SingleObjectActionCreators, makeSingleObjectActionCreators } from "./actionCreators";
import { SingleObjectReducer, makeSingleObjectReducer } from "./reducer";

export interface SingleObjectDomain<T> {
  identifier: string | symbol;
  actionCreators: SingleObjectActionCreators<T>;
  reducer: SingleObjectReducer<T>;
}

export function createSingleObjectDomain<T>(
  initialState: T | null,
  discriminator?: string
): SingleObjectDomain<T> {
  const identifier = discriminator || Symbol();
  const actionCreators: SingleObjectActionCreators<T> = makeSingleObjectActionCreators(identifier);
  const reducer: SingleObjectReducer<T> = makeSingleObjectReducer(identifier, initialState);

  return {
    identifier,
    actionCreators,
    reducer
  };
}
