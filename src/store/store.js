import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Import reducers
import giphy from "../reducers/giphy";
import appState from "../reducers/appState";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

// add all reducers here
export const reducers = combineReducers({
  giphy: giphy,
  appState: appState,
});

const store = createStore(reducers, composedEnhancer);

export default store;
