# redux-generic

Dumb, hence generic, action creators and reducers. You provide them with a payload, they update the state accordingly without additional thoughts. This makes sense assuming that the business intelligence is implemented in middlewares, e.g. thunks.

`redux-generic` provides you with utilities for updating three kinds of states: states made of one single value, states made of one single object and states made of a collection of objects (more specifically a set of objects indexed by an identifier).

## Installation

```
npm i -S redux-generic
```

## Usage: single value

The basic approach with Redux would be to implement the business logic in the reducer. Here, we'll assume it is implemented elsewhere, so that the updated value is provided as an argument of the action creator:

```javascript
import { createStore } from "redux";
import { createSingleValueDomain } from "redux-generic";

const counterDomain = createSingleValueDomain(0, "COUNTER");
const store = createStore(counterDomain.reducer);
const incrementCounter = counterDomain.actionCreator(1, "COUNTER_INCREMENTED");
store.dispatch(incrementCounter);
```

## Usage: single object

Same thing, but the state is now an object, and the reducers knows how to update it partially.

```javascript
import { createStore } from "redux";
import { createSingleObjectDomain } from "redux-generic";

const counterDomain = createSingleObjectDomain({}, "NAME");
const store = createStore(counterDomain.reducer);
const updateFirstName = counterDomain.actionCreators.createUpdateAction({ firstName: "First" }, "FIRST_NAME_UPDATED");
store.dispatch(updateFirstName);
```

## Usage: collections

Managing collections is a major concern when working with a normalized state. This approach is very well described in the following articles:

- https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
- https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5

```javascript
import { createStore } from "redux";
import { createCollectionDomain } from "redux-generic";

const userDomain = createCollectionDomain("USER");
const store = createStore(userDomain.reducer);
const insertUserAction = userDomain.actionCreators.createInsertAction(
  "03ba44f",
  { firstName: "John", lastName: "Doe" },
  "NEW_USER_INSERTED"
);
store.dispatch(insertUserAction);
```

[`redux-crud`](https://www.npmjs.com/package/redux-crud) is an interesting concurrent implementation, though `redux-generic` probably covers a wider range of use cases. `redux-generic` is an implementation of dumb reducers, while `redux-crud` is a solution for the sub-problem of state normalization.
