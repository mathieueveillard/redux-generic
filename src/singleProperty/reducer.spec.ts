import { createStore, Store, AnyAction } from "redux";
import { SinglePropertyDomain, createSinglePropertyDomain } from "./domain";
import { SinglePropertyAction } from "./action";

const domain: SinglePropertyDomain<number> = createSinglePropertyDomain<number>(0, "COUNTER");
let store: Store;

describe("Generic and domain", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should handle only single property actions of the domain with the proper type", function() {
    // GIVEN
    const action: AnyAction = {
      type: "NOT_A_GENERIC_ACTION"
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(0);
  });

  it("Should handle only single property actions of the domain with the proper type", function() {
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

  it("Should handle only single property actions of the domain with the proper type", function() {
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

  it("Should handle only single property actions of the domain with the proper type", function() {
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

describe("UPDATE_SINGLE_PROPERTY_ACTION", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should set default state", function() {
    expect(store.getState()).toEqual(0);
  });

  it("Should update state", function() {
    // GIVEN
    const action: SinglePropertyAction<number> = domain.actionCreator(1);

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(1);
  });
});
