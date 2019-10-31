import { createStore, Store, AnyAction } from "redux";
import { SingleValueDomain, createSingleValueDomain } from "./domain";
import { SingleValueAction } from "./action";

const domain: SingleValueDomain<number> = createSingleValueDomain<number>(0, "COUNTER");
let store: Store;

describe("Generic and domain", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should handle only single value actions of the domain with the proper type", function() {
    // GIVEN
    const action: AnyAction = {
      type: "NOT_A_GENERIC_ACTION"
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(0);
  });

  it("Should handle only single value actions of the domain with the proper type", function() {
    // GIVEN
    const action: AnyAction = {
      type: "OUT_OF_THE_DOMAIN_ACTION",
      meta: {
        singleProperty: false
      }
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(0);
  });

  it("Should handle only single value actions of the domain with the proper type", function() {
    // GIVEN
    const action: AnyAction = {
      type: "OUT_OF_THE_DOMAIN_ACTION",
      meta: {
        singleProperty: true,
        domain: "ANOTHER_DOMAIN"
      }
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(0);
  });

  it("Should handle only single value actions of the domain with the proper type", function() {
    // GIVEN
    const action: AnyAction = {
      type: "OUT_OF_THE_DOMAIN_ACTION",
      meta: {
        singleProperty: true,
        domain: "COUNTER",
        type: "OUT_OF_THE_DOMAIN_ACTION"
      }
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(0);
  });
});

describe("UPDATE_SINGLE_VALUE_ACTION", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should set default state", function() {
    expect(store.getState()).toEqual(0);
  });

  it("Should update state", function() {
    // GIVEN
    const action: SingleValueAction<number> = domain.actionCreator(1);

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(1);
  });
});
