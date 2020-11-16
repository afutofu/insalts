import React from "react";
import styled from "styled-components";

import Button from "../components/Button";

const SaltListComp = styled.div`
    width: 250px;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 30px;
`;

const Title = styled.h2`
    width: 100%;
    font-size: 16px;
    text-transform: uppercase;
    padding: 16px 20px;
    border-bottom: 1px solid #ccc;
    font-weight: 500;
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
    font-size: 14px;
    list-style: none;
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
`;

const SaltList = () => {
    return (
        <SaltListComp>
            <Title>Saltiest Salts</Title>
            <List>
                <ListItem>Yo Mama</ListItem>
                <ListItem>Cats</ListItem>
                <ListItem>Faces</ListItem>
            </List>
            <Button src="/salts">view all</Button>
        </SaltListComp>
    );
};

export default SaltList;
