import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Jumbotron from "../components/Jumbotron";
import InfoCard from "../components/InfoCard";
import SaltItem from "../components/SaltItem";

import { getSalts } from "../store/actions/salt";
import { loginModalToggle, saltModalToggle } from "../store/actions/modal";

const SaltsComp = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: relative;
  width: 90%;
  margin: auto;
  display: flex;
`;

const Content = styled.section`
  width: 70%;
  padding-right: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Aside = styled.aside`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const Salts = (props) => {
  const {
    isAuthenticated,
    salts,
    user,
    getSalts,
    loginModalToggle,
    saltModalToggle,
  } = props;

  useEffect(() => {
    getSalts();
  }, []);

  return (
    <SaltsComp>
      <Jumbotron salts={true} />
      <Container>
        <Content>
          {salts.map((salt, i) => {
            return (
              <SaltItem
                key={i}
                name={salt.name}
                title={salt.title}
                description={salt.description}
              />
            );
          })}
        </Content>
        <Aside>
          <InfoCard
            title="salts"
            desc="Check out all the Salts made by our users, or create one yourself!"
            buttons={[
              {
                text: "create salt",
                onClick: isAuthenticated ? saltModalToggle : loginModalToggle,
              },
            ]}
          />
          {isAuthenticated && (
            <InfoCard
              type="list"
              title="joined salts"
              list={user.joinedSalts.map((salt) => {
                return salt.name;
              })}
              buttons={[
                {
                  text: "create salt",
                  onClick: isAuthenticated ? saltModalToggle : loginModalToggle,
                },
              ]}
            />
          )}
        </Aside>
      </Container>
    </SaltsComp>
  );
};

const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    salts: state.salt.salts,
    user: state.auth.user,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getSalts: () => dispatch(getSalts()),
    loginModalToggle: () => dispatch(loginModalToggle()),
    saltModalToggle: () => dispatch(saltModalToggle()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Salts);
