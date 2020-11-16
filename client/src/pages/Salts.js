import React from "react";
import styled from "styled-components";

import Jumbotron from "../components/Jumbotron";
import InfoCard from "../components/InfoCard";

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

const Salts = () => {
    return (
        <SaltsComp>
            <Jumbotron salts={true} />
            <Container>
                <Content></Content>
                <Aside>
                    <InfoCard
                        title="salts"
                        desc="Check out all the Salts made by our users, or create one yourself!"
                        buttons={[{ text: "create salt" }]}
                    />
                </Aside>
            </Container>
        </SaltsComp>
    );
};

export default Salts;
