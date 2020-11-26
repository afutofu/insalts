import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";

import SmallButton from "./SmallButton";

const PostItemComp = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid white;
  box-sizing: border-box;
  cursor: ${(props) => (props.noHover ? "auto" : "pointer")};

  transition: border 0.15s;
  :hover {
    border: ${(props) => (props.noHover ? "" : "1px solid #e98455")};
  }
`;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;

  @media only screen and (max-width: 600px) {
    padding: 0 15px;
  }
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  /* height: 50px; */
  display: flex;
  align-items: center;
  color: #888;
  background-color: #f5f5f5;
  padding-bottom: 10px;
  box-sizing: border-box;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
  font-size: 0.7rem;
  line-height: 1.5em;

  @media only screen and (max-width: 600px) {
    padding: 13px 0;
    font-size: 0.6rem;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MetaInfo = styled.div``;

const SaltName = styled.span`
  font-weight: 600;
  margin-right: 10px;
  color: #b64e1f;
  font-size: 0.8rem;

  @media only screen and (max-width: 600px) {
    font-size: 0.7rem;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  :hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  padding-top: 18px;
  box-sizing: border-box;

  @media only screen and (max-width: 600px) {
    padding: 15px 0;
    padding-top: 13px;
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 15px;
  line-height: 1.4em;

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const ContentInfo = styled.p`
  font-size: 0.8rem;
  margin: 0;
`;

const CommentBox = styled.textarea.attrs((props) => ({
  type: props.type ?? "text",
  name: props.name ?? "name",
  placeholder: props.placeholder ?? "",
}))`
  position: relative;
  width: 100%;
  height: 120px;
  padding: 10px 20px;
  border-radius: 5px;
  color: #222;
  background-color: #fff;
  outline: none;
  border: 1px #ddd solid;
  box-sizing: border-box;
  font-size: 14px;
  font-family: "Montserrat", "san-serif";
  margin: 0;
  margin-top: 23px;
  resize: none;
  line-height: 1.5em;
  font-size: 0.8rem;

  :focus {
    border: 1px #e98455 solid;
  }
`;

const PostItem = (props) => {
  const [redirectToPost, setRedirectToPost] = useState(false);

  const toRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  if (redirectToPost)
    return <Redirect to={`/s/${props.saltName}/posts/${props.id}`} />;

  if (props.type === "page") {
    return (
      <PostItemComp noHover={props.noHover}>
        <Header>
          <Container>
            <HeaderContainer>
              <MetaInfo>
                {props.saltName && (
                  <SaltName>
                    <Link
                      to={`/s/${props.saltName}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      s/{props.saltName}
                    </Link>
                  </SaltName>
                )}
                Posted by {props.username} {toRelativeTime(props.createdAt)}
              </MetaInfo>
              <ButtonContainer>
                {props.author &&
                  props.buttons &&
                  props.buttons.map((button, i) => {
                    return (
                      <SmallButton
                        key={i}
                        secondary={button.secondary}
                        onClick={button.onClick}
                      >
                        {button.text}
                      </SmallButton>
                    );
                  })}
              </ButtonContainer>
            </HeaderContainer>
          </Container>
        </Header>
        <Content>
          <Container>
            <Title>{props.title}</Title>
            <ContentInfo>{props.content}</ContentInfo>
            <CommentBox name="comment" placeholder="Comment on this post" />
          </Container>
        </Content>
      </PostItemComp>
    );
  }

  return (
    <PostItemComp onClick={() => setRedirectToPost(true)}>
      <Header>
        <Container>
          {!props.noSaltLink && props.saltName && (
            <SaltName>
              <Link
                to={`/s/${props.saltName}`}
                onClick={(e) => e.stopPropagation()}
              >
                s/{props.saltName}
              </Link>
            </SaltName>
          )}
          Posted by {props.username} {toRelativeTime(props.createdAt)}
        </Container>
      </Header>
      <Content>
        <Container>
          <Title>{props.title}</Title>
          <ContentInfo>{props.content}</ContentInfo>
        </Container>
      </Content>
    </PostItemComp>
  );
};

export default PostItem;
