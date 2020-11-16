import React from "react";
import styled from "styled-components";

import Jumbotron from "../components/Jumbotron";
import SaltList from "../components/SaltList";
import InfoCard from "../components/InfoCard";

const HomeComp = styled.section`
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
    position: relative;
    width: 70%;
    display: flex;
    flex-direction: column;
`;

const Aside = styled.aside`
    position: relative;
    width: 30%;
    display: flex;
    flex-direction: column;
`;

const Home = () => {
    return (
        <HomeComp>
            <Jumbotron />
            <Container>
                <Content></Content>
                <Aside>
                    <SaltList />
                    <InfoCard
                        title="home"
                        desc="Your personal InSalts homepage, come here to check on insalts from your favorite salts"
                        buttons={[
                            {
                                text: "create insalt"
                            },
                            {
                                text: "create salt",
                                secondary: true,
                                noMarginTop: true
                            }
                        ]}
                    />
                </Aside>
            </Container>
        </HomeComp>
    );
};

export default Home;
