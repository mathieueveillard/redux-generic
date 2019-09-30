import { Reducer } from "redux";
import { GenericAction, InsertAction, UpsertAction, UpdateAction, DeleteAction } from "./actions";
import { GenericState } from "./state";

const ITEM_ALREADY_EXISTS_ERROR_MESSAGE: string = "Item already exists";
const ITEM_NOT_FOUND_ERROR_MESSAGE: string = "Item not found";

export type GenericReducer<T> = Reducer<GenericState<T>, GenericAction<T>>;

export function makeGenericReducer<T>(domain: string | symbol): GenericReducer<T> {
  const initialState: GenericState<T> = {};

  return function(state: GenericState<T> = initialState, action: GenericAction<T>): GenericState<T> {
    if (action.meta === undefined || !action.meta.generic) {
      return state;
    }
    if (action.meta.domain !== domain) {
      return state;
    }

    switch (action.meta.type) {
      case "GENERIC_INSERT_ACTION": {
        const { id, item } = action as InsertAction<T>;
        return insert(state, id, item);
      }
      case "GENERIC_UPSERT_ACTION": {
        const { id, item } = action as UpsertAction<T>;
        return upsert(state, id, item);
      }
      case "GENERIC_UPDATE_ACTION": {
        const { id, patch } = action as UpdateAction<T>;
        return update(state, id, patch);
      }
      case "GENERIC_DELETE_ACTION": {
        const { id } = action as DeleteAction<T>;
        return remove(state, id);
      }
      default:
        return state;
    }
  };
}

function insert<T>(state: GenericState<T>, id: string, item: T): GenericState<T> {
  if (state[id] !== undefined) {
    throw new Error(ITEM_ALREADY_EXISTS_ERROR_MESSAGE);
  }
  return {
    ...state,
    [id]: item
  };
}

function upsert<T>(state: GenericState<T>, id: string, item: T | Partial<T>): GenericState<T> {
  if (state[id] === undefined) {
    return insert<T>(state, id, item as T);
  }
  return update<T>(state, id, item);
}

function update<T>(state: GenericState<T>, id: string, patch: Partial<T>): GenericState<T> {
  if (state[id] === undefined) {
    throw new Error(ITEM_NOT_FOUND_ERROR_MESSAGE);
  }
  return {
    ...state,
    [id]: {
      ...(state[id] as any),
      ...(patch as any)
    }
  };
}

function remove<T>(state: GenericState<T>, id: string): GenericState<T> {
  if (state[id] === undefined) {
    throw new Error(ITEM_NOT_FOUND_ERROR_MESSAGE);
  }
  const { [id]: value, ...rest } = state;
  return rest;
}
