import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../store/actions/auth";
import { loginModalToggle, registerModalToggle } from "../store/actions/modal";

const NavbarComp = styled.nav`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #fff;
  box-sizing: border-box;
`;

const Icon = styled.img.attrs(() => ({
  src: "https://image.freepik.com/free-icon/salt_318-127920.jpg",
}))`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0;
  color: black;
  font-weight: 400;

  a {
    color: unset;
    text-decoration: none;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
`;

const NavItem = styled.li`
  font-size: 16px;
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
`;

const Navbar = (props) => {
  const {
    isAuthenticated,
    user,
    logout,
    loginModalToggle,
    registerModalToggle,
  } = props;

  return (
    <NavbarComp>
      <Title>
        <Link to="/">
          <Icon />
          Insalts
        </Link>
      </Title>
      <NavItems>
        {isAuthenticated ? (
          <>
            <NavItem>{user.username}</NavItem>
            <NavItem onClick={() => logout()}>Logout</NavItem>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
