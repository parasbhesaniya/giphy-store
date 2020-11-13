import {
  UPDATE_THEME,
  UPDATE_SEARCH_STR,
  SET_IS_FETCHING,
} from "../actions/appState";
import { THEME_LIGHT } from "../constants";

const initialState = {
  theme: THEME_LIGHT,
  searchStr: "",
  isFetching: false,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_THEME:
      return { ...state, theme: action.payload };
    case UPDATE_SEARCH_STR:
      return { ...state, searchStr: action.payload };
    case SET_IS_FETCHING:
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};

export default appState;
