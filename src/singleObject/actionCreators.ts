import { InsertAction, UpsertAction, UpdateAction, DeleteAction } from "./actions";

export interface SingleObjectActionCreators<T> {
  createInsertAction(item: T, type?: string): InsertAction<T>;
  createUpsertAction(item: T, type?: string): UpsertAction<T>;
  createUpdateAction(patch: Partial<T>, type?: string): UpdateAction<T>;
  createDeleteAction(type?: string): DeleteAction;
}

export function makeSingleObjectActionCreators<T>(domain: string | symbol): SingleObjectActionCreators<T> {
  function createInsertAction<T>(item: T, type?: string): InsertAction<T> {
    return {
      type: type || "SINGLE_OBJECT_INSERT_ACTION",
      item,
      meta: {
        singleObject: true,
        domain,
        type: "SINGLE_OBJECT_INSERT_ACTION"
      }
    };
  }

  function createUpsertAction<T>(item: T, type?: string): UpsertAction<T> {
    return {
      type: type || "SINGLE_OBJECT_UPSERT_ACTION",
      item,
      meta: {
        singleObject: true,
        domain,
        type: "SINGLE_OBJECT_UPSERT_ACTION"
      }
    };
  }

  function createUpdateAction<T>(patch: Partial<T>, type?: string): UpdateAction<T> {
    return {
      type: type || "SINGLE_OBJECT_UPDATE_ACTION",
      patch,
      meta: {
        singleObject: true,
        domain,
        type: "SINGLE_OBJECT_UPDATE_ACTION"
      }
    };
  }

  function createDeleteAction(type?: string): DeleteAction {
    return {
      type: type || "SINGLE_OBJECT_DELETE_ACTION",
      meta: {
        singleObject: true,
        domain,
        type: "SINGLE_OBJECT_DELETE_ACTION"
      }
    };
  }

  return {
    createInsertAction,
    createUpsertAction,
    createUpdateAction,
    createDeleteAction
  };
}
