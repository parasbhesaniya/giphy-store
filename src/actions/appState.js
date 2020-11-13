import { THEME_LIGHT, THEME_DARK } from "../constants";

export const UPDATE_THEME = "UPDATE_THEME";
export const UPDATE_SEARCH_STR = "UPDATE_SEARCH_STR";
export const SET_IS_FETCHING = "SET_IS_FETCHING";

async function toggleThemeAction(dispatch, getState) {
  const state = getState();
  let theme = "";
  if (state.appState.theme === THEME_LIGHT) {
    theme = THEME_DARK;
  } else if (state.appState.theme === THEME_DARK) {
    theme = THEME_LIGHT;
  } else {
    return;
  }

  dispatch({ type: UPDATE_THEME, payload: theme });
}

async function updateSearchStr(dispatch, getState, searchStr) {
  dispatch({ type: UPDATE_SEARCH_STR, payload: searchStr });
}

async function updateIsFetching(dispatch, getState, isFetching) {
  dispatch({ type: SET_IS_FETCHING, payload: isFetching });
}

export { toggleThemeAction, updateSearchStr, updateIsFetching };
