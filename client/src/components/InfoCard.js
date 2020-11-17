import React from "react";
import styled from "styled-components";

import Button from "../components/Button";

const InfoCardComp = styled.div`
  width: 280px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  width: 100%;
  font-size: 18px;
  text-transform: uppercase;
  padding: 16px 20px;
  border-bottom: 1px solid #ccc;
  font-weight: 500;
  margin: 0;
  box-sizing: border-box;
`;

const Desc = styled.p`
  font-size: 16px;
  line-height: 1.5em;
  padding: 15px 20px;
  padding-bottom: 0;
  margin: 0;
`;

const InfoCard = (props) => {
  return (
    <InfoCardComp>
      <Title>{props.title}</Title>
      <Desc>{props.desc}</Desc>
      {props.buttons.map((button, i) => {
        return (
          <Button
            key={i}
            secondary={button.secondary}
            noMarginTop={button.secondary}
            onClick={button.onClick}
          >
            {button.text}
          </Button>
        );
      })}
    </InfoCardComp>
  );
};

export default InfoCard;
