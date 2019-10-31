import { Action } from "redux";

export type SingleObjectAction<T> = InsertAction<T> | UpsertAction<T> | UpdateAction<T> | DeleteAction;

interface CommonAction extends Action<string> {
  meta: {
    singleObject: true;
    domain: string | symbol;
  };
}

export type InsertAction<T> = CommonAction & {
  item: T;
  meta: {
    type: "SINGLE_OBJECT_INSERT_ACTION";
  };
};

export type UpsertAction<T> = CommonAction & {
  item: T;
  meta: {
    type: "SINGLE_OBJECT_UPSERT_ACTION";
  };
};

export type UpdateAction<T> = CommonAction & {
  patch: Partial<T>;
  meta: {
    type: "SINGLE_OBJECT_UPDATE_ACTION";
  };
};

export type DeleteAction = CommonAction & {
  meta: {
    type: "SINGLE_OBJECT_DELETE_ACTION";
  };
};
