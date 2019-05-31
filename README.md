# redux-generic

Generic (CRUD) action creators and reducer, useful for normalizing state.

## Installation

```
npm install --save redux-generic
```

## Insight

`redux-generic` creates a collection of objects as a `Record`:

```typescript
type GenericState<T> = Record<string, T>;
```

Though not required, it is common use for `T` to have an `id` and to use this `id` as key in the record, when calling either `actionCreators.createInsertAction()` or `actionCreators.createUpsertAction()` (see below).

`redux-generic` allows you to build a `GenericDomain` object that holds generic (CRUD) `actionCreators` and a generic `reducer`:

```typescript
interface GenericDomain<T> {
  identifier: string | symbol;
  actionCreators: GenericActionCreators<T>;
  reducer: GenericReducer<T>;
}
```

## Usage

```typescript
import { createGenericDomain, GenericDomain } from "redux-generic";

interface Entity {
  id: string;
  // Other attributes
}

export const entityDomain: GenericDomain<Entity> = createGenericDomain("ENTITY");

/*
 * GenericAction creators, to be used as any regular action creators:
 * createInsertAction<T>(id: string, item: T, type?: string): InsertAction<T>;
 * createUpsertAction<T>(id: string, item: T, type?: string): UpsertAction<T>;
 * createUpdateAction<T>(id: string, patch: Partial<T>, type?: string): UpdateAction<T>;
 * createDeleteAction<T>(id: string, type?: string): DeleteAction<T>;
 */
entityDomain.actionCreators;

/*
 * GenericReducer, to be used as any regular reducer:
 * type GenericReducer<T> = Reducer<GenericState<T>, GenericAction<T>>;
 */
entityDomain.reducer;
```

## Inspiration

- https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
- https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5
- https://www.npmjs.com/package/redux-crud
- https://github.com/markerikson/redux-ecosystem-links/blob/master/action-reducer-generators.md
