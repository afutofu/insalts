import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import SaltItem from "../components/SaltItem";

import { getSalts, joinSalt, leaveSalt } from "../store/actions/salt";
import {
  loginModalToggle,
  saltModalToggle,
  questionModalToggle,
  setModalData,
} from "../store/actions/modal";

const SaltComp = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: relative;
  width: 90%;
  margin: auto;
  display: flex;
`;

const Content = styled.section`
  width: 70%;
  padding-right: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Aside = styled.aside`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const Salt = (props) => {
  const {
    isAuthenticated,
    salts,
    user,
    getSalts,
    joinSalt,
    leaveSalt,
    loginModalToggle,
    saltModalToggle,
    questionModalToggle,
    setModalData,
  } = props;

  const { saltName } = props.match.params;

  useEffect(() => {
    // getSalts();
  }, [getSalts]);

  return (
    <SaltComp>
      <Jumbotron salts={true} title={`s/${saltName}`} />
      <Container>
        <Content></Content>
        <Aside>
          <Card
            title={`s/${saltName}`}
            titleLowercase={true}
            desc="Check out all the Salt made by our users, or create one yourself!"
            buttons={[
              {
                text: "join",
                onClick: isAuthenticated ? saltModalToggle : loginModalToggle,
                secondary: true,
              },
              {
                text: "create post",
              },
              {
                text: "edit",
                secondary: true,
              },
              {
                text: "delete",
              },
            ]}
          />
        </Aside>
      </Container>
    </SaltComp>
  );
};

const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    salts: state.salt.salts,
    user: state.auth.user,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getSalts: () => dispatch(getSalts()),
    joinSalt: (saltName) => dispatch(joinSalt(saltName)),
    leaveSalt: (saltName) => dispatch(leaveSalt(saltName)),
    loginModalToggle: () => dispatch(loginModalToggle()),
    saltModalToggle: () => dispatch(saltModalToggle()),
    questionModalToggle: () => dispatch(questionModalToggle()),
    setModalData: (data) => dispatch(setModalData(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Salt);
