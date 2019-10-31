export interface SingleValueAction<T> {
  type: string;
  payload: T;
  meta: {
    singleValue: true;
    domain: string | symbol;
    type: "UPDATE_SINGLE_VALUE_ACTION";
  };
}
