import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";

import { getSalt, joinSalt, leaveSalt } from "../store/actions/salt";
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
    user,
    salt,
    getSalt,
    joinSalt,
    leaveSalt,
    loginModalToggle,
    saltModalToggle,
    questionModalToggle,
    setModalData,
  } = props;

  const { saltName } = props.match.params;

  useEffect(() => {
    getSalt(saltName);
  }, [getSalt, saltName]);

  const isUserJoined = (saltName) => {
    if (isAuthenticated && user.joinedSalts) {
      for (const joinedSalt of user.joinedSalts) {
        if (joinedSalt.name === saltName) {
          return true;
        }
      }
    }
    return false;
  };

  const renderJoinButtonText = () => {
    if (isUserJoined(salt.name)) {
      return "leave";
    }
    return "join";
  };

  const renderSaltCardButtons = () => {
    let buttons = [];
    if (isUserJoined(salt.name)) {
      buttons = [
        {
          text: renderJoinButtonText(),
          onClick: () => {
            if (!isAuthenticated) {
              loginModalToggle();
            } else {
              if (isUserJoined(salt.name)) {
                // Leave button
                setModalData({
                  question: `Are you sure you want to leave ${salt.name} ?`,
                  options: [
                    {
                      text: "leave",
                      onClick: () => leaveSalt(salt.name),
                    },
                  ],
                });
                questionModalToggle();
              } else {
                // Join button
                setModalData({
                  question: `Are you sure you want to join ${salt.name} ?`,
                  options: [
                    {
                      text: "join",
                      onClick: () => joinSalt(salt.name),
                    },
                  ],
                });
                questionModalToggle();
              }
            }
          },
          secondary: true,
        },
        {
          text: "create post",
        },
        {
          text: "edit",
          onClick: () => {
            if (!isAuthenticated) {
              loginModalToggle();
            } else {
              if (isUserJoined(salt.name)) {
                setModalData({
                  type: "edit",
                  name: salt.name,
                  title: salt.title,
                  description: salt.description,
                });
                saltModalToggle();
              } else {
              }
            }
          },
          secondary: true,
        },
        {
          text: "delete",
        },
      ];
    } else {
      buttons = [
        {
          text: renderJoinButtonText(),
          onClick: () => {
            if (!isAuthenticated) {
              loginModalToggle();
            } else {
              if (isUserJoined(salt.name)) {
                // Leave button
                setModalData({
                  question: `Are you sure you want to leave ${salt.name} ?`,
                  options: [
                    {
                      text: "leave",
                      onClick: () => leaveSalt(salt.name),
                    },
                  ],
                });
                questionModalToggle();
              } else {
                // Join button
                setModalData({
                  question: `Are you sure you want to join ${salt.name} ?`,
                  options: [
                    {
                      text: "join",
                      onClick: () => joinSalt(salt.name),
                    },
                  ],
                });
                questionModalToggle();
              }
            }
          },
          secondary: true,
        },
        {
          text: "create post",
        },
      ];
    }

    return buttons;
  };

  return (
    <SaltComp>
      <Jumbotron
        salts={true}
        title={salt ? salt.title : "Retreiving salt information..."}
        description={salt && salt.description}
      />
      {salt ? (
        <Container>
          <Content></Content>
          <Aside>
            <Card
              title={`s/${salt.name}`}
              titleLowercase={true}
              desc={salt.description}
              buttons={renderSaltCardButtons()}
            />
          </Aside>
        </Container>
      ) : null}
    </SaltComp>
  );
};

const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    salt: state.salt.selectedSalt,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getSalt: (name) => dispatch(getSalt(name)),
    joinSalt: (name) => dispatch(joinSalt(name)),
    leaveSalt: (name) => dispatch(leaveSalt(name)),
    loginModalToggle: () => dispatch(loginModalToggle()),
    saltModalToggle: (data) => dispatch(saltModalToggle(data)),
    questionModalToggle: () => dispatch(questionModalToggle()),
    setModalData: (data) => dispatch(setModalData(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Salt);
