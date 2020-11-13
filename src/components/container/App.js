import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import Home from "./home";

import "bootstrap/dist/css/bootstrap.min.css";
import { THEME_LIGHT } from "../../constants";

function App({ theme }) {
  return (
    <div
      className={`h-100 ${(theme === THEME_LIGHT && "bg-light") || "bg-dark"}`}
    >
      <Container className="App">
        <Router>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: state.appState.theme,
});

export default connect(mapStateToProps)(App);
