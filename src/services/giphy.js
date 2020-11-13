import api from "./api";
import { APIs } from "../constants";

const defaultParams = {
  api_key: process.env.REACT_APP_GIPHY_API_KEY || "",
  offset: 0,
  limit: 50,
};

const getGiphyTrending = async ({ params }) => {
  params = params || {};
  let url = APIs.giphyTrending;
  const method = "get";
  const response = await api({
    url,
    method,
    params: { ...defaultParams, ...params },
  });

  if (response && response.status && response.status === 200) {
    const { data } = response;
    return data;
  }
  return false;
};

const getGiphySearch = async ({ params }) => {
  params = params || {};
  let url = APIs.giphySearch;
  const method = "get";
  const response = await api({
    url,
    method,
    params: { ...defaultParams, ...params },
  });

  if (response && response.status && response.status === 200) {
    const { data } = response;
    return data;
  }
  return false;
};

export { getGiphyTrending, getGiphySearch };
