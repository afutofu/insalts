import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import SmallButton from "./SmallButton";

const borderRadius = "5px";

const SaltItemComp = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  /* border-radius: ${borderRadius} ${borderRadius} 0 0; */
`;

const HeaderContainer = styled.div`
  /* position: relative; */
  width: 100%;
  height: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.h2`
  color: #b64e1f;
  font-size: 17px;
  font-weight: 500;
  margin: 0;
  padding: 0;

  a {
    color: inherit;
    text-decoration: inherit;
  }

  :hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  width: 100%;
  background-color: #fff;
  /* border-radius: 0 0 ${borderRadius} ${borderRadius}; */
`;

const ContentContainer = styled.div`
  /* position: relative; */
  width: 100%;
  padding: 25px;
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
`;

const SaltItem = (props) => {
  return (
    <SaltItemComp>
      <Header>
        <HeaderContainer>
          <Name>
            <Link to={`/s/${props.name}`}>s/{props.name}</Link>
          </Name>
          {!props.joined && (
            <SmallButton onClick={props.joinSalt}>Join</SmallButton>
          )}
        </HeaderContainer>
      </Header>
      <Content>
        <ContentContainer>
          <Title>{props.title}</Title>
          <Description>{props.description}</Description>
        </ContentContainer>
      </Content>
    </SaltItemComp>
  );
};

export default SaltItem;
