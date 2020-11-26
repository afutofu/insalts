import React from "react";
import styled from "styled-components";

const ContainerComp = styled.div`
  position: relative;
  width: 65%;
  margin: auto;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 1200px) {
    width: 80%;
  }

  @media only screen and (max-width: 992px) {
    width: 95%;
  }
`;

const Container = (props) => {
  return <ContainerComp>{props.children}</ContainerComp>;
};

export default Container;
