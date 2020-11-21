import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import { getPosts } from "../store/actions/post";

const HomeComp = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: relative;
  width: 80%;
  margin: auto;
  display: flex;
`;

const Content = styled.section`
  position: relative;
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const Aside = styled.aside`
  position: relative;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const Home = (props) => {
  const { getPosts } = props;

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <HomeComp>
      <Jumbotron />
      <Container>
        <Content></Content>
        <Aside>
          <Card
            type="list"
            title="saltiest salts"
            buttons={[
              {
                text: "view all",
                src: "/s",
              },
            ]}
          />
          <Card
            title="home"
            desc="Your personal InSalts homepage, come here to check on insalts from your favorite salts"
            buttons={[
              {
                text: "create insalt",
              },
              {
                text: "create salt",
                secondary: true,
                noMarginTop: true,
              },
            ]}
          />
        </Aside>
      </Container>
    </HomeComp>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getPosts()),
  };
};

export default connect(null, mapDispatchToProps)(Home);
