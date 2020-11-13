import { getGiphyTrending, getGiphySearch } from "../services/giphy";

import { SET_IS_FETCHING } from "./appState";

export const UPDATE_TRENDING_GIFS = "UPDATE_TRENDING_GIFS";
export const UPDATE_SEARCH_GIFS = "UPDATE_SEARCH_GIFS";

async function getTrendingGifsAction(dispatch, getState) {
  dispatch({ type: SET_IS_FETCHING, payload: true });
  const response = await getGiphyTrending({});
  dispatch({ type: UPDATE_TRENDING_GIFS, payload: response });
  dispatch({ type: SET_IS_FETCHING, payload: false });
}

async function getSearchGifsAction(dispatch, getState, str) {
  const params = {
    q: str,
  };
  dispatch({ type: SET_IS_FETCHING, payload: true });
  const response = await getGiphySearch({ params });
  dispatch({ type: UPDATE_TRENDING_GIFS, payload: response });
  dispatch({ type: SET_IS_FETCHING, payload: false });
}

async function getNextGifsAction(dispatch, getState) {
  const { giphy, appState } = getState();
  const params = {};

  if (
    giphy &&
    giphy.data &&
    giphy.data.length &&
    giphy.pagination &&
    giphy.pagination.count + giphy.pagination.offset <
      giphy.pagination.total_count
  ) {
    params.offset = giphy.pagination.count + giphy.pagination.offset;
    if (appState.searchStr) {
      params.q = appState.searchStr;
    }
  } else {
    return;
  }

  dispatch({ type: SET_IS_FETCHING, payload: true });
  let res = null;
  if (appState.searchStr) {
    res = await getGiphySearch({ params });
  } else {
    res = await getGiphyTrending({ params });
  }

  if (res) {
    dispatch({
      type: UPDATE_TRENDING_GIFS,
      payload: { ...res, data: [...giphy.data, ...res.data] },
    });
  }
  dispatch({ type: SET_IS_FETCHING, payload: false });
}

export { getTrendingGifsAction, getSearchGifsAction, getNextGifsAction };
