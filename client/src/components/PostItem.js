import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

const PostItemComp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid white;
  box-sizing: border-box;

  transition: border 0.15s;
  :hover {
    border: 1px solid #e98455;
  }
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
  border-bottom: 1px solid #ddd;
  font-size: 0.85rem;
`;

const SaltName = styled.span`
  font-weight: 600;
  margin-right: 10px;
  color: #b64e1f;
  font-size: 1rem;

  a {
    color: inherit;
    text-decoration: inherit;
  }

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
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 15px;
`;

const ContentInfo = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const PostItem = (props) => {
  const toRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  return (
    <PostItemComp>
      <Link to={`/s/${props.saltName}/posts/${props.id}`}>
        <Header>
          <Container>
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
          </Container>
        </Header>
        <Content>
          <Container>
            <Title>{props.title}</Title>
            <ContentInfo>{props.content}</ContentInfo>
          </Container>
        </Content>
      </Link>
    </PostItemComp>
  );
};

export default PostItem;
