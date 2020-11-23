import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import SmallButton from "../components/SmallButton";
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";
import PostItem from "../components/PostItem";

import { getPost } from "../store/actions/post";
import { joinSalt, leaveSalt } from "../store/actions/salt";
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
    post,
    isLoading,
    error,
    getPost,
    joinSalt,
    leaveSalt,
    loginModalToggle,
    saltModalToggle,
    postModalToggle,
    questionModalToggle,
    setModalData,
  } = props;

  const { postId } = props.match.params;

  const [redirectToSalt, setRedirectToSalt] = useState(false);

  useEffect(() => {
    getPost(postId);
  }, [getPost, postId]);

  const isUserJoined = (postId) => {
    if (isAuthenticated && user.joinedSalts) {
      for (const joinedSalt of user.joinedSalts) {
        if (joinedSalt.name === postId) {
          return true;
        }
      }
    }
    return false;
  };

  const renderJumbotronTitle = () => {
    if (isLoading) return "Retreiving post information...";
    if (error) return error;
  };

  const renderJoinButtonText = () => {
    if (isUserJoined(post.salt.name)) {
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
            if (isUserJoined(post.salt.name)) {
              // Leave button
              setModalData({
                question: `Are you sure you want to leave ${post.salt.name} ?`,
                options: [
                  {
                    text: "leave",
                    onClick: () => leaveSalt(post.salt.name),
                  },
                ],
              });
              questionModalToggle();
            } else {
              // Join button
              setModalData({
                question: `Are you sure you want to join ${post.salt.name} ?`,
                options: [
                  {
                    text: "join",
                    onClick: () => joinSalt(post.salt.name),
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
      {redirectToSalt && <Redirect to={`/s/${post.saltName}`} />}
      {error && <Jumbotron salts={true} title={renderJumbotronTitle()} />}
      {post ? (
        <Container>
          <InnerContainer>
            <Content></Content>
            <Aside>
              <Card
                title={`about`}
                desc={post.salt.description}
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
    post: state.post.selectedPost,
    isLoading: state.post.isLoading,
    error: state.post.error,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getPost: (postId) => dispatch(getPost(postId)),
    joinSalt: (saltName) => dispatch(joinSalt(saltName)),
    leaveSalt: (saltName) => dispatch(leaveSalt(saltName)),
    loginModalToggle: () => dispatch(loginModalToggle()),
    saltModalToggle: (data) => dispatch(saltModalToggle(data)),
    postModalToggle: () => dispatch(postModalToggle()),
    questionModalToggle: () => dispatch(questionModalToggle()),
    setModalData: (data) => dispatch(setModalData(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Salt);
