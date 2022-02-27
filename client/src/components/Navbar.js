import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../store/actions/auth";
import {
  loginModalToggle,
  registerModalToggle,
  questionModalToggle,
  setModalData,
} from "../store/actions/modal";
import saltIcon from "../assets/salt-icon.jpg";

const NavbarComp = styled.nav`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #fff;
  box-sizing: border-box;

  @media only screen and (max-width: 600px) {
    padding: 20px 20px;
  }
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0;
  color: black;
  font-weight: 400;

  a {
    color: unset;
    text-decoration: none;
    display: flex;
  }

  @media only screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
`;

const NavItem = styled.li`
  font-size: 0.9rem;
  padding: 5px;
  margin-left: 30px;
  color: #666;
  list-style: none;
  display: flex;
  cursor: pointer;

  transition: color 0.2s;
  :hover {
    color: #b64e1f;
  }

  @media only screen and (max-width: 600px) {
    font-size: 0.7rem;
    margin-left: 15px;
  }
`;

/*
Navbar

Displays:-
Logo: onClick takes client to Home page "/""

Additionally:-
When not logged in:-
- Register: onClick opens register modal
- Login: onClick opens login modal

When logged in:
- Username: for display
- Logout: onClick opens questionModal to verify action
*/

const Navbar = (props) => {
  const {
    isAuthenticated,
    user,
    logout,
    loginModalToggle,
    registerModalToggle,
    questionModalToggle,
    setModalData,
  } = props;

  return (
    <NavbarComp>
      <Title>
        <Link to="/">
          <Icon src={saltIcon} />
          Insalts
        </Link>
      </Title>
      <NavItems>
        {isAuthenticated ? (
          <>
            <NavItem>{user.username}</NavItem>
            <NavItem
              onClick={() => {
                setModalData({
                  question: "Are you sure you want to logout ?",
                  options: [
                    {
                      text: "logout",
                      onClick: logout,
                    },
                  ],
                });
                questionModalToggle();
              }}
            >
              Logout
            </NavItem>
          </>
        ) : (
          <>
            <NavItem onClick={() => loginModalToggle()}>Login</NavItem>
            <NavItem onClick={() => registerModalToggle()}>Register</NavItem>
          </>
        )}
      </NavItems>
    </NavbarComp>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    loginModalToggle: () => dispatch(loginModalToggle()),
    registerModalToggle: () => dispatch(registerModalToggle()),
    questionModalToggle: () => dispatch(questionModalToggle()),
    setModalData: (data) => dispatch(setModalData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
