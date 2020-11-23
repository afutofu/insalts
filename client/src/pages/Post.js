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
  padding-top: 50px;
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
    if (isUserJoined(post.salt.name)) {
      return [
        {
          text: "view salt page",
          onClick: () => setRedirectToSalt(true),
        },
      ];
    } else {
      return [
        {
          text: renderJoinButtonText(),
          onClick: () => {
            if (!isAuthenticated) {
              loginModalToggle();
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
          },
        },
        {
          text: "view salt page",
          onClick: () => setRedirectToSalt(true),
          secondary: true,
        },
      ];
    }
  };

  const renderPostButtons = () => {
    return [
      {
        text: "edit",
      },
      {
        text: "delete",
        secondary: true,
      },
    ];
  };

  return (
    <PostComp>
      {redirectToSalt && <Redirect to={`/s/${post.saltName}`} />}
      {error && <Jumbotron salts={true} title={renderJumbotronTitle()} />}
      {post && post.id == postId && (
        <Container>
          <InnerContainer>
            <Content>
              <PostItem
                type="page"
                noHover={true}
                author={user && user.id === post.userId}
                saltName={post.saltName}
                username={post.user.username}
                createdAt={post.createdAt}
                title={post.title}
                content={post.content}
                buttons={renderPostButtons()}
              />
            </Content>
            <Aside>
              <Card
                title={post.salt.title}
                desc={post.salt.description}
                buttons={renderSaltCardButtons()}
              />
            </Aside>
          </InnerContainer>
        </Container>
      )}
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
