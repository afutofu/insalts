import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonComp = styled.button.attrs(props => ({
    src: props.src
}))`
    display: block;
    width: calc(100% - 40px);
    height: 43px;
    padding: 8px 0;
    text-align: center;
    background-color: ${props =>
        props.secondary ? "white" : "rgb(182, 78, 31)"};
    color: ${props => (props.secondary ? "rgb(182, 78, 31)" : "white")};
    margin: 15px 20px;
    margin-top: ${props => props.noMarginTop && "0px"};
    text-transform: uppercase;
    border: ${props =>
        props.secondary ? "1px solid rgb(182, 78, 31)" : "none"};
    outline: none;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: 600;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transition: background-color 0.2s, color 0.2s, border 0.2s;

    :hover {
        text-decoration: none;
        color: ${props => (props.secondary ? "rgb(233, 132, 85)" : "white")};
        background-color: ${props =>
            props.secondary ? "white" : "rgb(233, 132, 85)"};
        border: ${props =>
            props.secondary ? "1px solid rgb(233, 132, 85)" : "none"};
    }

    :focus {
        outline: none;
    }

    a {
        width: 100%;
        height: 100%;
        color: ${props => (props.secondary ? "rgb(182, 78, 31)" : "white")};
        display: flex;
        justify-content: center;
        align-items: center;

        transition: color 0.2s, border 0.2s;

        :hover {
            text-decoration: none;
            color: ${props =>
                props.secondary ? "rgb(233, 132, 85)" : "white"};
        }
    }
`;

const Button = props => {
    return (
        <ButtonComp
            secondary={props.secondary}
            noMarginTop={props.noMarginTop}
            src={props.src}
        >
            <Link to={props.src ?? "/"}>{props.children}</Link>
        </ButtonComp>
    );
};

export default Button;
