import { InsertAction, UpsertAction, UpdateAction, DeleteAction } from "./actions";

export interface CollectionActionCreators<T> {
  createInsertAction(id: string, item: T, type?: string): InsertAction<T>;
  createUpsertAction(id: string, item: T, type?: string): UpsertAction<T>;
  createUpdateAction(id: string, patch: Partial<T>, type?: string): UpdateAction<T>;
  createDeleteAction(id: string, type?: string): DeleteAction;
}

export function makeCollectionActionCreators<T>(domain: string | symbol): CollectionActionCreators<T> {
  function createInsertAction<T>(id: string, item: T, type?: string): InsertAction<T> {
    return {
      type: type || "COLLECTION_INSERT_ACTION",
      id,
      item,
      meta: {
        collection: true,
        domain,
        type: "COLLECTION_INSERT_ACTION"
      }
    };
  }

  function createUpsertAction<T>(id: string, item: T, type?: string): UpsertAction<T> {
    return {
      type: type || "COLLECTION_UPSERT_ACTION",
      id,
      item,
      meta: {
        collection: true,
        domain,
        type: "COLLECTION_UPSERT_ACTION"
      }
    };
  }

  function createUpdateAction<T>(id: string, patch: Partial<T>, type?: string): UpdateAction<T> {
    return {
      type: type || "COLLECTION_UPDATE_ACTION",
      id,
      patch,
      meta: {
        collection: true,
        domain,
        type: "COLLECTION_UPDATE_ACTION"
      }
    };
  }

  function createDeleteAction(id: string, type?: string): DeleteAction {
    return {
      type: type || "COLLECTION_DELETE_ACTION",
      id,
      meta: {
        collection: true,
        domain,
        type: "COLLECTION_DELETE_ACTION"
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
