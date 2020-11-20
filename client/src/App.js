import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "normalize.css";

import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import SaltModal from "./components/SaltModal";
import QuestionModal from "./components/QuestionModal";

import Home from "./pages/Home";
import Salts from "./pages/Salts";
import Salt from "./pages/Salt";
import NotFound from "./pages/NotFound";

import { fetchUser } from "./store/actions/auth";

const AppComp = styled.div`
  font-family: "Montserrat", "san-serif";
  background-color: #d5d9df;
  min-height: 100vh;
`;

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }, [fetchUser]);

  return (
    <Router>
      <AppComp>
        <Navbar />
        <LoginModal />
        <RegisterModal />
        <SaltModal />
        <QuestionModal />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/s" exact component={Salts} />
          <Route path="/s/:saltName" exact component={Salt} />
          <Route path="/" component={NotFound} />
        </Switch>
      </AppComp>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);
