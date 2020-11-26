import React from "react";
import styled from "styled-components";

const ContainerComp = styled.div`
  position: relative;
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 1200px) {
    width: 80%;
  }

  @media only screen and (max-width: 992px) {
    width: 90%;
  }

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Container = (props) => {
  return <ContainerComp>{props.children}</ContainerComp>;
};

export default Container;
