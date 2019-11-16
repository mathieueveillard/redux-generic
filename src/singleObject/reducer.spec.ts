import { createStore, Store } from "redux";
import { SingleObjectDomain, createSingleObjectDomain } from "./domain";
import { InsertAction, UpsertAction, UpdateAction, DeleteAction } from "./actions";

interface TestItem {
  name: string;
  optional0?: string;
  optional1?: string;
}

const domain: SingleObjectDomain<TestItem> = createSingleObjectDomain<TestItem>(null, "DOMAIN");
let store: Store;

describe("Single Object", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should handle only actions of the domain", function() {
    // GIVEN
    const action = {
      type: "NOT_A_SINGLE_OBJECT_ACTION"
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(null);
  });

  it("Should handle only actions of the domain", function() {
    // GIVEN
    const action = {
      type: "OUT_OF_THE_DOMAIN_ACTION",
      meta: {
        singleObject: false
      }
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(null);
  });

  it("Should handle only actions of the domain", function() {
    // GIVEN
    const action = {
      type: "OUT_OF_THE_DOMAIN_ACTION",
      meta: {
        singleObject: true,
        domain: "ANOTHER_DOMAIN"
      }
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(null);
  });

  it("Should handle only actions of the domain", function() {
    // GIVEN
    const action = {
      type: "OUT_OF_THE_DOMAIN_ACTION",
      meta: {
        singleObject: true,
        domain: "DOMAIN",
        type: "OUT_OF_THE_DOMAIN_ACTION"
      }
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual(null);
  });
});

describe("Insert", () => {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should add item to the state", function() {
    // GIVEN
    // WHEN
    const action: InsertAction<TestItem> = domain.actionCreators.createInsertAction({
      name: "name"
    });
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual({ name: "name" });
  });

  it("Should throw error when trying to insert an item if the state is already initialized", function() {
    // GIVEN
    const action: InsertAction<TestItem> = domain.actionCreators.createInsertAction({
      name: "name"
    });
    store.dispatch(action);

    // WHEN
    // THEN
    expect(() => store.dispatch(action)).toThrow("The state is already initialized.");
  });
});

describe("Update", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should throw error if the state has not been initialized", function() {
    // GIVEN
    // WHEN
    const action: UpdateAction<TestItem> = domain.actionCreators.createUpdateAction({
      name: "updatedName"
    });

    // THEN
    expect(() => store.dispatch(action)).toThrow("The state has not been initialized yet.");
  });

  it("Should update the item in the state", function() {
    // GIVEN
    const insertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction({
      name: "name",
      optional0: "optional0"
    });
    store.dispatch(insertAction);

    // WHEN
    const updateAction: UpdateAction<TestItem> = domain.actionCreators.createUpdateAction({
      optional0: "updated0ptional0"
    });
    store.dispatch(updateAction);

    // THEN
    expect(store.getState()).toEqual({
      name: "name",
      optional0: "updated0ptional0"
    });
  });

  it("Should reset optional fields", function() {
    // GIVEN
    const insertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction({
      name: "name",
      optional0: "optional0"
    });
    store.dispatch(insertAction);

    // WHEN
    const updateAction: UpdateAction<TestItem> = domain.actionCreators.createUpdateAction({
      optional0: undefined
    });
    store.dispatch(updateAction);

    // THEN
    expect(store.getState()).toEqual({
      name: "name"
    });
  });
});

describe("Upsert", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should add the item to the state if it has not been initialized yet", function() {
    // GIVEN
    // WHEN
    const action: UpsertAction<TestItem> = domain.actionCreators.createUpsertAction({
      name: "name"
    });
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual({
      name: "name"
    });
  });

  it("Should update the item if the state has already been initialized", function() {
    // GIVEN
    const insertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction({
      name: "name"
    });
    store.dispatch(insertAction);

    // WHEN
    const upsertAction: UpsertAction<TestItem> = domain.actionCreators.createUpsertAction({
      name: "updatedName"
    });
    store.dispatch(upsertAction);

    // THEN
    expect(store.getState()).toEqual({
      name: "updatedName"
    });
  });
});

describe("Delete", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should delete item in the state", function() {
    // GIVEN
    const insertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction({
      name: "name"
    });
    store.dispatch(insertAction);

    // WHEN
    const deleteAction: DeleteAction = domain.actionCreators.createDeleteAction();
    store.dispatch(deleteAction);

    // THEN
    expect(store.getState()).toEqual(null);
  });
});
