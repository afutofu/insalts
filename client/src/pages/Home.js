import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Container from "../components/Container";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import PostItem from "../components/PostItem";

import { getPosts } from "../store/actions/post";
import { getSalts } from "../store/actions/salt";

const HomeComp = styled.section`
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
`;

const Aside = styled.aside`
  display: relative;
  max-width: 30%;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const Home = (props) => {
  const { posts, salts, getPosts, getSalts } = props;

  useEffect(() => {
    getPosts();
    getSalts();
  }, [getPosts, getSalts]);

  return (
    <HomeComp>
      <Jumbotron />
      <Container>
        <Content>
          {posts.map((post, i) => {
            return (
              <PostItem
                key={i}
                id={post.id}
                saltName={post.saltName}
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
            type="list"
            title="saltiest salts"
            list={salts.map((salt) => salt.name)}
            buttons={[
              {
                text: "view all",
                src: "/s",
              },
            ]}
          />
          <Card
            title="home"
            desc="Your personal Insalts homepage, come here to check on posts from your favorite salts"
          />
        </Aside>
      </Container>
    </HomeComp>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
    salts: state.salt.salts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getPosts()),
    getSalts: () => dispatch(getSalts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
