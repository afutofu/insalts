import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";

import { getPosts } from "../store/actions/post";
import { getSalts } from "../store/actions/salt";

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
  const { salts, getPosts, getSalts } = props;

  useEffect(() => {
    getPosts();
    getSalts();
  }, [getPosts, getSalts]);

  return (
    <HomeComp>
      <Jumbotron />
      <Container>
        <Content></Content>
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
