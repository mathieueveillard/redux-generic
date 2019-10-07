import { createStore, Action, Store } from "redux";
import { CollectionDomain, createCollectionDomain } from "./domain";
import { InsertAction, UpsertAction, UpdateAction, DeleteAction } from "./actions";

interface TestItem {
  name: string;
  optional0?: string;
  optional1?: string;
}

const domain: CollectionDomain<TestItem> = createCollectionDomain<TestItem>();
let store: Store;

describe("Generic and domain", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should handle only generic actions", function() {
    // GIVEN
    const action: Action = {
      type: "NOT_A_GENERIC_ACTION"
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual({});
  });

  it("Should handle only generic actions of the domain", function() {
    // GIVEN
    const action: Action & { meta: { generic: boolean } } = {
      type: "OUT_OF_THE_DOMAIN_ACTION",
      meta: {
        generic: false
      }
    };

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual({});
  });
});

describe("Insert", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should add item to the state state", function() {
    // GIVEN
    const action: InsertAction<TestItem> = domain.actionCreators.createInsertAction("id", {
      name: "name"
    });

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual({
      ["id"]: { name: "name" }
    });
  });

  it("Should throw error when trying to insert an item that already exists in state", function() {
    // GIVEN
    const action: InsertAction<TestItem> = domain.actionCreators.createInsertAction("id", {
      name: "name"
    });
    store.dispatch(action);

    // WHEN
    // THEN
    expect(() => store.dispatch(action)).toThrow("Item already exists");
  });
});

describe("Upsert", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
    const anotherInsertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction("anotherId", {
      name: "anotherName"
    });
    store.dispatch(anotherInsertAction);
  });

  it("Should add item to the state if not present", function() {
    // GIVEN
    const action: UpsertAction<TestItem> = domain.actionCreators.createUpsertAction("id", {
      name: "name"
    });

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual({
      ["anotherId"]: { name: "anotherName" },
      ["id"]: { name: "name" }
    });
  });

  it("Should update the item if already present in the state", function() {
    // GIVEN
    const insertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction("id", {
      name: "name",
      optional0: "optional0"
    });
    const upsertAction: UpsertAction<TestItem> = domain.actionCreators.createUpsertAction("id", {
      name: "updated name"
    });

    // WHEN
    store.dispatch(insertAction);
    store.dispatch(upsertAction);

    // THEN
    expect(store.getState()).toEqual({
      ["anotherId"]: { name: "anotherName" },
      ["id"]: { name: "updated name", optional0: "optional0" }
    });
  });
});

describe("Update", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
    const anotherInsertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction("anotherId", {
      name: "anotherName"
    });
    store.dispatch(anotherInsertAction);
  });

  it("Should throw error if item is not present in the state", function() {
    // GIVEN
    const action: UpdateAction<TestItem> = domain.actionCreators.createUpdateAction("id", {
      name: "name"
    });

    // WHEN

    // THEN
    expect(() => store.dispatch(action)).toThrow("Item not found");
  });

  it("Should update item in the state", function() {
    // GIVEN
    const insertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction("id", {
      name: "name",
      optional0: "optional0"
    });
    const updateAction: UpdateAction<TestItem> = domain.actionCreators.createUpdateAction("id", {
      name: "updated name"
    });

    // WHEN
    store.dispatch(insertAction);
    store.dispatch(updateAction);

    // THEN
    expect(store.getState()).toEqual({
      ["anotherId"]: { name: "anotherName" },
      ["id"]: { name: "updated name", optional0: "optional0" }
    });
  });

  it("Should manage resetting optional fields", function() {
    // GIVEN
    const insertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction("id", {
      name: "name",
      optional0: "value",
      optional1: "value"
    });
    const updateAction: UpdateAction<TestItem> = domain.actionCreators.createUpdateAction("id", {
      optional0: undefined
    });

    // WHEN
    store.dispatch(insertAction);
    store.dispatch(updateAction);

    // THEN
    expect(store.getState()).toEqual({
      ["anotherId"]: { name: "anotherName" },
      ["id"]: {
        name: "name",
        optional1: "value"
      }
    });
  });
});

describe("Delete", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
    const anotherInsertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction("anotherId", {
      name: "anotherName"
    });
    store.dispatch(anotherInsertAction);
  });

  it("Should throw error if item is not present in the state", function() {
    // GIVEN
    const action: DeleteAction<TestItem> = domain.actionCreators.createDeleteAction("id");

    // WHEN

    // THEN
    expect(() => store.dispatch(action)).toThrow("Item not found");
  });

  it("Should delete item in the state", function() {
    // GIVEN
    const insertAction: InsertAction<TestItem> = domain.actionCreators.createInsertAction("id", {
      name: "name"
    });
    const deleteAction: DeleteAction<TestItem> = domain.actionCreators.createDeleteAction("id");

    // WHEN
    store.dispatch(insertAction);
    store.dispatch(deleteAction);

    // THEN
    expect(store.getState()).toEqual({
      ["anotherId"]: { name: "anotherName" }
    });
  });
});

describe("Overriding action type", function() {
  beforeEach(function() {
    store = createStore(domain.reducer);
  });

  it("Should handle action where type is overriden", function() {
    // GIVEN
    const action: InsertAction<TestItem> = domain.actionCreators.createInsertAction(
      "id",
      { name: "name" },
      "OVERRIDEN_ACTION_TYPE"
    );

    // WHEN
    store.dispatch(action);

    // THEN
    expect(store.getState()).toEqual({
      ["id"]: { name: "name" }
    });
  });
});
