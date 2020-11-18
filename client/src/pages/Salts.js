import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Jumbotron from "../components/Jumbotron";
import InfoCard from "../components/InfoCard";

import { getSalts } from "../store/actions/salt";
import { loginModalToggle, saltModalToggle } from "../store/actions/modal";

const SaltsComp = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: relative;
  width: 80%;
  margin: auto;
  display: flex;
`;

const Content = styled.section`
  width: 70%;
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
        <Content></Content>
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
        </Aside>
      </Container>
    </SaltsComp>
  );
};

const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
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
