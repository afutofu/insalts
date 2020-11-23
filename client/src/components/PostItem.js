import React from "react";
import styled from "styled-components";

const PostItemComp = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
`;

const Header = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 20px;
  font-size: 500;
`;

const ContentInfo = styled.p`
  font-size: 16px;
`;

const PostItem = () => {
  return (
    <PostItemComp>
      <Header>s/yomama Posted by Afu 10 seconds ago</Header>
      <Content>
        <Title> Yo mama title</Title>
        <ContentInfo>Yo amma joke</ContentInfo>
      </Content>
    </PostItemComp>
  );
};

export default PostItem;
