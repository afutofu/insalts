import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import SmallButton from "../components/SmallButton";
import Card from "../components/Card";
import PostItem from "../components/PostItem";

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

const PostComp = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: relative;
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.section`
  display: relative;
  flex: 1;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Aside = styled.aside`
  display: relative;
  max-width: 30%;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
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

  const { saltName, postId } = props.match.params;

  const [redirectToSalt, setRedirectToSalt] = useState(false);

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
      {
        text: "view salt posts",
        onClick: () => setRedirectToSalt(true),
        secondary: true,
      },
    ];

    return buttons;
  };

  return (
    <PostComp>
      {redirectToSalt && <Redirect to={`/s/${saltName}`} />}
      {salt ? (
        <Container>
          <InnerContainer>
            <Content>
              {salt.posts.map((post, i) => {
                return (
                  <PostItem
                    key={i}
                    username={post.user.username}
                    createdAt={post.createdAt}
                    title={post.title}
                    content={post.content}
                  />
                );
              })}
            </Content>
            <Aside>
              <Card
                title={`about`}
                desc={salt.description}
                buttons={renderSaltCardButtons()}
              />
            </Aside>
          </InnerContainer>
        </Container>
      ) : null}
    </PostComp>
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
