import React from "react";
import styled from "styled-components";

import Button from "./Button";
import SmallButton from "./SmallButton";

const CardComp = styled.div`
  /* width: 280px; */
  width: 100%;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  width: 100%;
  font-size: 19px;
  text-transform: uppercase;
  padding: ${(props) => (props.text ? "20px" : "18px 20px")};
  padding-bottom: ${(props) => (props.text ? "0px" : "16px")};
  border-bottom: ${(props) => (props.text ? "" : "1px solid #ddd")};
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
  border-bottom: ${(props) => (props.noBorder ? "" : "1px solid #ddd")};
  padding: 14px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    opacity: 0;
    transition: opacity 0.1s;
  }

  :hover {
    button {
      opacity: 1;
    }
  }
`;

const Card = (props) => {
  switch (props.type) {
    case "list":
      return (
        <CardComp>
          <Title>{props.title}</Title>
          <List>
            {props.list &&
              props.list.map((listItem, i) => {
                return (
                  <ListItem key={i} noBorder={i + 1 === props.list.length}>
                    {listItem}
                  </ListItem>
                );
              })}
          </List>
          {props.buttons &&
            props.buttons.map((button, i) => {
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
        </CardComp>
      );
    case "joinedSalts":
      return (
        <CardComp>
          <Title>{props.title}</Title>
          <List>
            {props.list &&
              props.list.map((listItem, i) => {
                return (
                  <ListItem key={i} noBorder={i + 1 === props.list.length}>
                    {listItem.name}
                    <SmallButton onClick={listItem.onClick}>Leave</SmallButton>
                  </ListItem>
                );
              })}
          </List>
          {props.buttons &&
            props.buttons.map((button, i) => {
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
        </CardComp>
      );
    default:
      return (
        <CardComp>
          <Title text={true}>{props.title}</Title>
          <Desc>{props.desc}</Desc>
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
        </CardComp>
      );
  }
};

export default Card;
