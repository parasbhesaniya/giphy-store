import { UPDATE_SEARCH_GIFS, UPDATE_TRENDING_GIFS } from "../actions/giphy";

const initialState = {};

const giphy = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TRENDING_GIFS:
      return { ...state, ...action.payload };
    case UPDATE_SEARCH_GIFS:
      return state;
    default:
      return state;
  }
};

export default giphy;
