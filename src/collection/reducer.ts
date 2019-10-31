import { Reducer } from "redux";
import { CollectionAction, InsertAction, UpsertAction, UpdateAction, DeleteAction } from "./actions";
import { CollectionState } from "./state";

const ITEM_ALREADY_EXISTS_ERROR_MESSAGE: string = "Item already exists";
const ITEM_NOT_FOUND_ERROR_MESSAGE: string = "Item not found";

export type CollectionReducer<T> = Reducer<CollectionState<T>, CollectionAction<T>>;

export function makeCollectionReducer<T>(domain: string | symbol): CollectionReducer<T> {
  const initialState: CollectionState<T> = {};

  return function(state: CollectionState<T> = initialState, action: CollectionAction<T>): CollectionState<T> {
    if (action.meta === undefined || !action.meta.collection) {
      return state;
    }

    if (action.meta.domain !== domain) {
      return state;
    }

    switch (action.meta.type) {
      case "COLLECTION_INSERT_ACTION": {
        const { id, item } = action as InsertAction<T>;
        return insert(state, id, item);
      }
      case "COLLECTION_UPDATE_ACTION": {
        const { id, patch } = action as UpdateAction<T>;
        return update(state, id, patch);
      }
      case "COLLECTION_UPSERT_ACTION": {
        const { id, item } = action as UpsertAction<T>;
        return upsert(state, id, item);
      }
      case "COLLECTION_DELETE_ACTION": {
        const { id } = action as DeleteAction;
        return remove(state, id);
      }
      default:
        return state;
    }
  };
}

function insert<T>(state: CollectionState<T>, id: string, item: T): CollectionState<T> {
  if (state[id] !== undefined) {
    throw new Error(ITEM_ALREADY_EXISTS_ERROR_MESSAGE);
  }
  return {
    ...state,
    [id]: item
  };
}

function update<T>(state: CollectionState<T>, id: string, patch: Partial<T>): CollectionState<T> {
  if (state[id] === undefined) {
    throw new Error(ITEM_NOT_FOUND_ERROR_MESSAGE);
  }
  return {
    ...state,
    [id]: {
      ...state[id],
      ...patch
    }
  };
}

function upsert<T>(state: CollectionState<T>, id: string, item: T | Partial<T>): CollectionState<T> {
  if (state[id] === undefined) {
    return insert<T>(state, id, item as T);
  }
  return update<T>(state, id, item);
}

function remove<T>(state: CollectionState<T>, id: string): CollectionState<T> {
  if (state[id] === undefined) {
    throw new Error(ITEM_NOT_FOUND_ERROR_MESSAGE);
  }
  const { [id]: value, ...rest } = state;
  return rest;
}
