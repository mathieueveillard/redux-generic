export interface SinglePropertyAction<T> {
  type: string;
  payload: T;
  meta: {
    singleProperty: true;
    domain: string | symbol;
    type: "UPDATE_SINGLE_PROPERTY_ACTION";
  };
}
