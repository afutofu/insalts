import React from "react";
import styled from "styled-components";

const JumbotronComp = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://cdn11.bigcommerce.com/s-dis4vxtxtc/images/stencil/1280x1280/products/1867/2397/image_1577__37264.1567254894.jpg?c=2?imbypass=on");
  background-size: contain;
  margin-bottom: 20px;

  @media only screen and (max-width: 600px) {
    height: 80px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;

  @media only screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

// const Desc = styled.p`
//   font-size: 18px;
//   text-align: center;
//   background-color: rgba(255, 255, 255, 0.9);
//   border-radius: 15px;
//   padding: 5px 15px;
//   font-weight: 500;
// `;

const JumbotronSaltsComp = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://media.istockphoto.com/photos/background-of-white-sea-salt-picture-id184342915?k=6&m=184342915&s=612x612&w=0&h=iV9PtQwXQ2lnnIP_Bvzk3UwUg37tpDS0Zzgl-3wyRW4=");
  margin-bottom: 20px;

  @media only screen and (max-width: 600px) {
    height: 80px;
  }
`;

const ContainerSalts = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media only screen and (max-width: 1200px) {
    width: 80%;
  }

  @media only screen and (max-width: 992px) {
    width: 90%;
  }
`;

const TitleSalts = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 500;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  margin-bottom: 4px;

  @media only screen and (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const DescSalts = styled.p`
  margin: 0;
  font-size: 0.8rem;
  /* background-color: rgba(255, 255, 255, 0.9); */
  border-radius: 15px;
  font-weight: 500;

  @media only screen and (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const Jumbotron = (props) => {
  const home = (
    <JumbotronComp>
      <Container>
        <Title>Welcome to Insalts</Title>
      </Container>
    </JumbotronComp>
  );

  const salts = (
    <JumbotronSaltsComp>
      <ContainerSalts>
        <TitleSalts>{props.title}</TitleSalts>
        <DescSalts>{props.description}</DescSalts>
      </ContainerSalts>
    </JumbotronSaltsComp>
  );

  return props.salts ? salts : home;
};

export default Jumbotron;
