import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "normalize.css";

import store from "./store";

import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import Home from "./pages/Home";
import Salts from "./pages/Salts";

const AppComp = styled.div`
  font-family: "Montserrat", "san-serif";
  background-color: #d5d9df;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppComp>
          <Navbar />
          <LoginModal />
          <RegisterModal />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/salts" exact component={Salts} />
          </Switch>
        </AppComp>
      </Router>
    </Provider>
  );
};

export default App;
