import React from "react";
import styled from "styled-components";
import { saltModalToggle } from "../store/actions/modal";

const PostItemComp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
`;

const Container = styled.div`
  padding: 0 20px;
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  color: #888;
  background-color: #f5f5f5;
  padding-bottom: 10px;
  box-sizing: border-box;
  padding: 15px 0;
`;

const SaltName = styled.span`
  font-weight: 600;
  margin-right: 10px;
  color: #b64e1f;

  :hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  padding-top: 18px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 15px;
`;

const ContentInfo = styled.p`
  font-size: 16px;
  margin: 0;
`;

const PostItem = (props) => {
  return (
    <PostItemComp>
      <Header>
        <Container>
          <SaltName>s/{props.saltName}</SaltName> Posted by {props.username}{" "}
          {props.createdAt}
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
