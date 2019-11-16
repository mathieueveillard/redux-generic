import { Reducer } from "redux";
import { SingleObjectAction, InsertAction, UpsertAction, UpdateAction, DeleteAction } from "./actions";
import { SingleObjectState } from "./state";

const STATE_ALREADY_INITIALIZED_ERROR_MESSAGE: string = "The state is already initialized.";
const STATE_NOT_INITIALIZED_YET_ERROR_MESSAGE: string = "The state has not been initialized yet.";

export type SingleObjectReducer<T> = Reducer<SingleObjectState<T>, SingleObjectAction<T>>;

export function makeSingleObjectReducer<T>(
  domain: string | symbol,
  initialState: T | null
): SingleObjectReducer<T> {
  return function(state: SingleObjectState<T> = initialState, action: SingleObjectAction<T>): SingleObjectState<T> {
    if (action.meta === undefined || !action.meta.singleObject) {
      return state;
    }

    if (action.meta.domain !== domain) {
      return state;
    }

    switch (action.meta.type) {
      case "SINGLE_OBJECT_INSERT_ACTION": {
        const { item } = action as InsertAction<T>;
        return insert(state, item);
      }
      case "SINGLE_OBJECT_UPDATE_ACTION": {
        const { patch } = action as UpdateAction<T>;
        return update(state, patch);
      }
      case "SINGLE_OBJECT_UPSERT_ACTION": {
        const { item } = action as UpsertAction<T>;
        return upsert(state, item);
      }
      case "SINGLE_OBJECT_DELETE_ACTION": {
        return remove();
      }
      default:
        return state;
    }
  };
}

function insert<T>(state: SingleObjectState<T>, item: T): SingleObjectState<T> {
  if (!(state === undefined || state === null)) {
    throw new Error(STATE_ALREADY_INITIALIZED_ERROR_MESSAGE);
  }
  return item;
}

function update<T>(state: SingleObjectState<T>, patch: Partial<T>): SingleObjectState<T> {
  if (state === undefined || state === null) {
    throw new Error(STATE_NOT_INITIALIZED_YET_ERROR_MESSAGE);
  }
  return {
    ...state,
    ...patch
  };
}

function upsert<T>(state: SingleObjectState<T>, item: T | Partial<T>): SingleObjectState<T> {
  if (state === undefined || state === null) {
    return insert<T>(state, item as T);
  }
  return update<T>(state, item);
}

function remove<T>(): SingleObjectState<T> {
  return null;
}
