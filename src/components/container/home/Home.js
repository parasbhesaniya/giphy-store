import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Button, InputGroup, FormControl } from "react-bootstrap";
import { debounce } from "lodash";

import { THEME_LIGHT, THEME_DARK } from "../../../constants";
import {
  getTrendingGifsAction,
  getSearchGifsAction,
  getNextGifsAction,
} from "../../../actions/giphy";
import { toggleThemeAction, updateSearchStr } from "../../../actions/appState";

import store from "../../../store/store";

import "./home.css";
import GifTile from "./GifTile";

function Home({ gifsData, theme, isFetching }) {
  useEffect(() => {
    store.dispatch(getTrendingGifsAction);
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (
        Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
          document.documentElement.offsetHeight ||
        isFetching
      )
        return;
      store.dispatch(getNextGifsAction);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInput = (e) => {
    const { value } = e.target;
    if (value) {
      store.dispatch((d, s) => getSearchGifsAction(d, s, value));
    } else {
      store.dispatch(getTrendingGifsAction);
    }
    store.dispatch((d, s) => updateSearchStr(d, s, value));
  };

  const handleInputThrottled = debounce(handleInput, 500);

  const handleThemeChange = () => {
    store.dispatch(toggleThemeAction);
  };

  if (gifsData && gifsData.data) {
    return (
      <div className="py-5">
        <Row
          className={`d-flex justify-content-center ${
            (theme === THEME_LIGHT && "text-dark") || "text-light"
          }`}
        >
          <h3>Giphy Store</h3>
        </Row>
        <Row>
          <InputGroup className="mb-3 my-2">
            <FormControl
              className="mr-2"
              aria-describedby="search gifs"
              placeholder="search by keyword"
              onChange={handleInputThrottled}
            />
            <Button
              onClick={handleThemeChange}
              title={`Turn theme to  ${
                (theme === THEME_LIGHT && THEME_DARK) || THEME_LIGHT
              }`}
              className={`${
                (theme === THEME_LIGHT && "btn-dark") || "btn-light"
              }`}
            >
              {(theme === THEME_LIGHT && THEME_DARK) || THEME_LIGHT}
            </Button>
          </InputGroup>
        </Row>
        <div className="masonry text-center">
          {gifsData.data.map((item) => (
            <GifTile data={item} key={item.id + Math.random()} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

const mapStateToProps = (state) => ({
  gifsData: state.giphy,
  theme: state.appState.theme,
  isFetching: state.appState.isFetching,
});

export default connect(mapStateToProps)(Home);
