import { Action } from "redux";

export type CollectionAction<T> = InsertAction<T> | UpsertAction<T> | UpdateAction<T> | DeleteAction;

interface CommonAction extends Action<string> {
  id: string;
  meta: {
    collection: true;
    domain: string | symbol;
  };
}

export type InsertAction<T> = CommonAction & {
  item: T;
  meta: {
    type: "COLLECTION_INSERT_ACTION";
  };
};

export type UpsertAction<T> = CommonAction & {
  item: T;
  meta: {
    type: "COLLECTION_UPSERT_ACTION";
  };
};

export type UpdateAction<T> = CommonAction & {
  patch: Partial<T>;
  meta: {
    type: "COLLECTION_UPDATE_ACTION";
  };
};

export type DeleteAction = CommonAction & {
  meta: {
    type: "COLLECTION_DELETE_ACTION";
  };
};
