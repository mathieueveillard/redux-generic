import { CollectionActionCreators, makeCollectionActionCreators } from "./actionCreators";
import { CollectionReducer, makeCollectionReducer } from "./reducer";

export interface CollectionDomain<T> {
  identifier: string | symbol;
  actionCreators: CollectionActionCreators<T>;
  reducer: CollectionReducer<T>;
}

export function createCollectionDomain<T>(discriminator?: string): CollectionDomain<T> {
  const identifier = discriminator || Symbol();
  const actionCreators: CollectionActionCreators<T> = makeCollectionActionCreators(identifier);
  const reducer: CollectionReducer<T> = makeCollectionReducer(identifier);

  return {
    identifier,
    actionCreators,
    reducer
  };
}
