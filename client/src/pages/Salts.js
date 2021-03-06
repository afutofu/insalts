import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Container from "../components/Container";
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

const SaltsComp = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Content = styled.section`
  display: relative;
  flex: 1;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const Aside = styled.aside`
  display: relative;
  max-width: 30%;
  width: 30%;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    max-width: unset;
    width: 100%;
  }
`;

const Salts = (props) => {
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

  useEffect(() => {
    getSalts();
  }, [getSalts]);

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

  return (
    <SaltsComp>
      <Jumbotron
        salts={true}
        title="Check Out All The Salts"
        description="Browse the saltiest salts. Find one you like and start posting!"
      />
      <Container>
        <Content>
          {salts.map((salt, i) => {
            return (
              <SaltItem
                key={i}
                name={salt.name}
                title={salt.title}
                description={salt.description}
                joined={isUserJoined(salt.name)}
                joinSalt={() => {
                  if (isAuthenticated) {
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
                  } else {
                    loginModalToggle();
                  }
                }}
              />
            );
          })}
        </Content>
        <Aside>
          <Card
            title="salts"
            desc="Check out all the Salts made by our users, or create one yourself!"
            buttons={[
              {
                text: "create salt",
                onClick: () => {
                  if (isAuthenticated) {
                    setModalData(null);
                    saltModalToggle();
                  } else {
                    loginModalToggle();
                  }
                },
              },
            ]}
          />
          {isAuthenticated && user.joinedSalts && user.joinedSalts.length > 0 && (
            <Card
              type="joinedSalts"
              title="joined salts"
              list={user.joinedSalts.map((salt) => {
                return {
                  name: salt.name,
                  onClick: () => {
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
                  },
                };
              })}
            />
          )}
        </Aside>
      </Container>
    </SaltsComp>
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

export default connect(mapStatetoProps, mapDispatchtoProps)(Salts);
