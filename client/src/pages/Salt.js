import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";

import {
  getSalt,
  deleteSalt,
  joinSalt,
  leaveSalt,
} from "../store/actions/salt";
import {
  loginModalToggle,
  saltModalToggle,
  postModalToggle,
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
    isLoading,
    error,
    getSalt,
    deleteSalt,
    joinSalt,
    leaveSalt,
    loginModalToggle,
    saltModalToggle,
    postModalToggle,
    questionModalToggle,
    setModalData,
  } = props;

  const { saltName } = props.match.params;

  const [redirectToSalts, setRedirectToSalts] = useState(false);

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

  const renderJumbotronTitle = () => {
    if (isLoading) return "Retreiving salt information...";
    if (salt) return salt.title;
    if (error) return error;
  };

  const renderSaltCardButtons = () => {
    let buttons = [
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
      },
    ];
    if (isUserJoined(salt.name)) {
      buttons = buttons.concat([
        {
          text: "create post",
          onClick: () => {
            if (!isAuthenticated) {
              loginModalToggle();
            } else {
              if (isUserJoined(salt.name)) {
                setModalData({
                  saltName: salt.name,
                });
                postModalToggle();
              } else {
              }
            }
          },
          secondary: true,
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
        },
        {
          text: "delete",
          onClick: () => {
            if (!isAuthenticated) {
              loginModalToggle();
            } else {
              if (isUserJoined(salt.name)) {
                setModalData({
                  question: `Are you sure you want to delete ${salt.name} ? This action cannot be undone.`,
                  options: [
                    {
                      text: "remove",
                      onClick: () => {
                        deleteSalt(salt.name)
                          .then(() => {
                            setRedirectToSalts(true);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      },
                    },
                  ],
                });
                questionModalToggle();
              } else {
              }
            }
          },
          secondary: true,
        },
      ]);
    }

    return buttons;
  };

  return (
    <SaltComp>
      {redirectToSalts && <Redirect to="/s" />}
      <Jumbotron
        salts={true}
        title={renderJumbotronTitle()}
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
    isLoading: state.salt.isLoading,
    error: state.salt.error,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getSalt: (name) => dispatch(getSalt(name)),
    deleteSalt: (name) => dispatch(deleteSalt(name)),
    joinSalt: (name) => dispatch(joinSalt(name)),
    leaveSalt: (name) => dispatch(leaveSalt(name)),
    loginModalToggle: () => dispatch(loginModalToggle()),
    saltModalToggle: (data) => dispatch(saltModalToggle(data)),
    postModalToggle: () => dispatch(postModalToggle()),
    questionModalToggle: () => dispatch(questionModalToggle()),
    setModalData: (data) => dispatch(setModalData(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Salt);
