import React from "react";
import styled from "styled-components";

import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";

const NotFoundComp = styled.section`
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

const NotFound = () => {
  return (
    <NotFoundComp>
      <Jumbotron salts={true} title={"Page not found"} />
    </NotFoundComp>
  );
};

export default NotFound;
