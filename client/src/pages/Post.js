import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "../components/Container";
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";
import PostItem from "../components/PostItem";

import { getPost, deletePost } from "../store/actions/post";
import { getSalt, joinSalt } from "../store/actions/salt";
import {
  loginModalToggle,
  postModalToggle,
  questionModalToggle,
  setModalData,
} from "../store/actions/modal";

const PostComp = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.div`
  padding-top: 50px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    padding-top: 20px;
    flex-direction: column-reverse;
    align-items: center;
  }
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
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    max-width: unset;
    width: 100%;
  }
`;

const Salt = (props) => {
  const {
    isAuthenticated,
    user,
    post,
    salt,
    isLoading,
    postError,
    saltError,
    getPost,
    deletePost,
    getSalt,
    joinSalt,
    loginModalToggle,
    postModalToggle,
    questionModalToggle,
    setModalData,
  } = props;

  const { saltName } = props.match.params;
  const postId = parseInt(props.match.params.postId);

  const [redirectToSalt, setRedirectToSalt] = useState(false);

  useEffect(() => {
    getSalt(saltName)
      .then(() => {
        getPost(postId);
      })
      .catch(() => {
        return;
      });
  }, [getSalt, saltName, getPost, postId]);

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
    if (saltError) return saltError;
    if (postError) return postError;
  };

  const renderJoinButtonText = () => {
    if (isUserJoined(salt.name)) {
      return "leave";
    }
    return "join";
  };

  const renderSaltCardButtons = () => {
    if (isUserJoined(salt.name)) {
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
        onClick: () => {
          setModalData({
            type: "edit",
            postId: post.id,
            title: post.title,
            content: post.content,
          });
          postModalToggle();
        },
      },
      {
        text: "delete",
        secondary: true,
        onClick: () => {
          if (!isAuthenticated) {
            loginModalToggle();
          } else {
            if (isUserJoined(saltName)) {
              setModalData({
                question: `Are you sure you want to delete this post ? This action cannot be undone.`,
                options: [
                  {
                    text: "delete",
                    onClick: () => {
                      deletePost(post.id)
                        .then(() => {
                          setRedirectToSalt(true);
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
      },
    ];
  };
  return (
    <PostComp>
      {redirectToSalt && <Redirect to={`/s/${saltName}`} />}
      {(saltError || postError) && (
        <Jumbotron salts={true} title={renderJumbotronTitle()} />
      )}
      {post && post.id === postId && (
        <Container>
          <InnerContainer>
            <Content>
              <PostItem
                type="page"
                noHover={true}
                author={user && user.id === post.userId}
                saltName={saltName}
                username={post.user.username}
                createdAt={post.createdAt}
                title={post.title}
                content={post.content}
                buttons={renderPostButtons()}
              />
            </Content>
            {salt && (
              <Aside>
                <Card
                  title={salt.title}
                  desc={salt.description}
                  buttons={renderSaltCardButtons()}
                />
              </Aside>
            )}
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
    salt: state.salt.selectedSalt,
    isLoading: state.post.isLoading,
    postError: state.post.error,
    saltError: state.salt.error,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getPost: (postId) => dispatch(getPost(postId)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    getSalt: (saltName) => dispatch(getSalt(saltName)),
    joinSalt: (saltName) => dispatch(joinSalt(saltName)),
    loginModalToggle: () => dispatch(loginModalToggle()),
    postModalToggle: () => dispatch(postModalToggle()),
    questionModalToggle: () => dispatch(questionModalToggle()),
    setModalData: (data) => dispatch(setModalData(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Salt);
