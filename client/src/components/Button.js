import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonComp = styled.button.attrs((props) => ({
  src: props.src,
}))`
  display: block;
  width: calc(100% - 40px);
  height: 43px;
  padding: 8px 0;
  text-align: center;
  background-color: ${(props) => (props.secondary ? "white" : "#b64e1f")};
  color: ${(props) => (props.secondary ? "#b64e1f" : "white")};
  margin: 15px 20px;
  margin-top: 0px;
  text-transform: uppercase;
  border: ${(props) => (props.secondary ? "1px solid #b64e1f" : "none")};
  outline: none;
  box-sizing: border-box;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: background-color 0.2s, color 0.2s, border 0.2s;

  :hover {
    text-decoration: none;
    color: ${(props) => (props.secondary ? "#e98455" : "white")};
    background-color: ${(props) => (props.secondary ? "white" : "#e98455")};
    border: ${(props) => (props.secondary ? "1px solid #e98455" : "none")};
  }

  :focus {
    outline: none;
  }

  a {
    width: 100%;
    height: 100%;
    color: ${(props) => (props.secondary ? "#b64e1f" : "white")};
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;

    transition: color 0.2s, border 0.2s;

    :hover {
      text-decoration: none;
      color: ${(props) => (props.secondary ? "#e98455" : "white")};
    }
  }
`;

const Button = (props) => {
  return (
    <ButtonComp
      secondary={props.secondary}
      noMarginTop={props.noMarginTop}
      src={props.src}
      onClick={props.onClick}
    >
      {props.onClick ? (
        props.children
      ) : (
        <Link to={props.src ?? "/"}>{props.children}</Link>
      )}
    </ButtonComp>
  );
};

export default Button;
