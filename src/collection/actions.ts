import { Action } from "redux";

export type CollectionAction<T> = InsertAction<T> | UpsertAction<T> | UpdateAction<T> | DeleteAction<T>;

interface CommonGenericAction extends Action<string> {
  id: string;
  meta: {
    generic: true;
    domain: string | symbol;
  };
}

export type InsertAction<T> = CommonGenericAction & {
  item: T;
  meta: {
    type: "GENERIC_INSERT_ACTION";
  };
};

export type UpsertAction<T> = CommonGenericAction & {
  item: T;
  meta: {
    type: "GENERIC_UPSERT_ACTION";
  };
};

export type UpdateAction<T> = CommonGenericAction & {
  id: string;
  patch: Partial<T>;
  meta: {
    type: "GENERIC_UPDATE_ACTION";
  };
};

export type DeleteAction<T> = CommonGenericAction & {
  id: string;
  meta: {
    type: "GENERIC_DELETE_ACTION";
  };
};
