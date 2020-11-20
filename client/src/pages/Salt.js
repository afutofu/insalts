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
    getSalt,
    joinSalt,
    leaveSalt,
    loginModalToggle,
    saltModalToggle,
    questionModalToggle,
    setModalData,
  } = props;

  const { saltName } = props.match.params;

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getSalt(saltName)
      .then((salt) => {
        setName(salt.name);
        setTitle(salt.title);
        setDescription(salt.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getSalt]);

  const isUserJoined = (name) => {
    if (isAuthenticated && user.joinedSalts) {
      for (const joinedSalt of user.joinedSalts) {
        if (joinedSalt.name === name) {
          return true;
        }
      }
    }
    return false;
  };

  const renderJoinButtonText = () => {
    if (!isAuthenticated) {
      return "join";
    }

    if (isUserJoined(name)) {
      return "leave";
    }

    return "join";
  };

  return (
    <SaltComp>
      <Jumbotron salts={true} title={title} description={description} />
      <Container>
        <Content></Content>
        <Aside>
          <Card
            title={`s/${name}`}
            titleLowercase={true}
            desc={description}
            buttons={[
              {
                text: renderJoinButtonText(),
                onClick: () => {
                  if (!isAuthenticated) {
                    loginModalToggle();
                  } else {
                    if (isUserJoined(name)) {
                      // Leave button
                      setModalData({
                        question: `Are you sure you want to leave ${name} ?`,
                        options: [
                          {
                            text: "leave",
                            onClick: () => leaveSalt(name),
                          },
                        ],
                      });
                      questionModalToggle();
                    } else {
                      // Join button
                      setModalData({
                        question: `Are you sure you want to join ${name} ?`,
                        options: [
                          {
                            text: "join",
                            onClick: () => joinSalt(name),
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
    user: state.auth.user,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getSalt: (name) => dispatch(getSalt(name)),
    joinSalt: (name) => dispatch(joinSalt(name)),
    leaveSalt: (name) => dispatch(leaveSalt(name)),
    loginModalToggle: () => dispatch(loginModalToggle()),
    saltModalToggle: () => dispatch(saltModalToggle()),
    questionModalToggle: () => dispatch(questionModalToggle()),
    setModalData: (data) => dispatch(setModalData(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Salt);