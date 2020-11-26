import React from "react";
import styled from "styled-components";

import Jumbotron from "../components/Jumbotron";

const NotFoundComp = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const NotFound = () => {
  return (
    <NotFoundComp>
      <Jumbotron salts={true} title={"Page not found"} />
    </NotFoundComp>
  );
};

export default NotFound;
