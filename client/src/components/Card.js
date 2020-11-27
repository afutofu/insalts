import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  font-size: 1.1rem;
  text-transform: ${(props) =>
    props.titleLowercase ? "lowercase" : "uppercase"};
  padding: ${(props) => (props.text ? "20px" : "18px 20px")};
  padding-bottom: ${(props) => (props.text ? "0px" : "16px")};
  border-bottom: ${(props) => (props.text ? "" : "1px solid #ddd")};
  font-weight: 500;
  margin: 0;
  box-sizing: border-box;
  line-height: 1.5rem;

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Desc = styled.p`
  font-size: 0.8rem;
  line-height: 1.5em;
  padding: 15px 20px;
  padding-bottom: 0;
  margin: 0;
  margin-bottom: 15px;
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
  margin-bottom: ${(props) => (props.noMarginBottom ? "0" : "15px")};
`;

const ListItem = styled.li`
  width: 100%;
  font-size: 0.8rem;
  list-style: none;
  border-bottom: ${(props) => (props.noBorder ? "" : "1px solid #ddd")};
  padding: 14px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: inherit;
    color: inherit;
  }

  button {
    opacity: 0;
    transition: opacity 0.1s;
  }

  :hover {
    a {
      text-decoration: underline;
    }

    button {
      opacity: 1;
      text-decoration: none;
    }
  }

  @media only screen and (max-width: 600px) {
    padding: 14px 20px;

    button {
      opacity: 1;
    }
  }
`;

/*
Mutli-purpose card
Can add list and buttons and custom components

Takes props :-
- type: specifies what type of card - list, joinedSalts, or none basic info card
- title: title of card
- list: array of string (if regular list), array of objects if (if joinedSalts)
- buttons: array of objects containing Button props
*/

const Card = (props) => {
  const { buttons } = props;

  const renderButtons = (buttons) => {
    if (buttons) {
      return buttons.map((button, i) => {
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
      });
    }
  };

  switch (props.type) {
    case "list":
      return (
        <CardComp>
          <Title>{props.title}</Title>
          <List>
            {props.list &&
              props.list.map((listItem, i) => {
                return (
                  <ListItem
                    key={i}
                    noBorder={!buttons && i + 1 === props.list.length}
                  >
                    <Link to={`/s/${listItem}`}>{listItem}</Link>
                  </ListItem>
                );
              })}
          </List>
          {renderButtons(buttons)}
        </CardComp>
      );
    case "joinedSalts":
      return (
        <CardComp>
          <Title>{props.title}</Title>
          <List noMarginBottom={!buttons}>
            {props.list &&
              props.list.map((listItem, i) => {
                return (
                  <ListItem key={i} noBorder={i + 1 === props.list.length}>
                    <Link to={`/s/${listItem.name}`}>{listItem.name}</Link>
                    <SmallButton onClick={listItem.onClick}>Leave</SmallButton>
                  </ListItem>
                );
              })}
          </List>
          {renderButtons(buttons)}
        </CardComp>
      );
    default:
      return (
        <CardComp>
          <Title text={true} titleLowercase={props.titleLowercase}>
            {props.title}
          </Title>
          <Desc>{props.desc}</Desc>
          {renderButtons(buttons)}
        </CardComp>
      );
  }
};

export default Card;
