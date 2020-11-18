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
  font-size: 19px;
  text-transform: uppercase;
  padding: ${(props) => (props.text ? "20px" : "16px 20px")};
  padding-bottom: ${(props) => (props.text ? "0px" : "16px")};
  border-bottom: ${(props) => (props.text ? "" : "1px solid #ccc")};
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

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  width: 100%;
  font-size: 16px;
  list-style: none;
  border-bottom: 1px solid #ccc;
  padding: 14px 20px;
  box-sizing: border-box;
`;

const InfoCard = (props) => {
  if (props.type === "list") {
    return (
      <InfoCardComp>
        <Title>{props.title}</Title>
        <List>
          <ListItem>Yo Mama</ListItem>
          <ListItem>Cats</ListItem>
          <ListItem>Faces</ListItem>
        </List>
        {props.buttons.map((button, i) => {
          return (
            <Button
              key={i}
              secondary={button.secondary}
              noMarginTop={button.secondary}
              src={button.src}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          );
        })}
      </InfoCardComp>
    );
  }
  return (
    <InfoCardComp>
      <Title text={true}>{props.title}</Title>
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
