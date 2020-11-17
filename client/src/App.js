import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "normalize.css";

import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import Home from "./pages/Home";
import Salts from "./pages/Salts";

import { fetchUser } from "./store/actions/auth";

const AppComp = styled.div`
  font-family: "Montserrat", "san-serif";
  background-color: #d5d9df;
  min-height: 100vh;
`;

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser()
      .then((res) => {
        console.log(res.data);
      })
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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/s" exact component={Salts} />
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
