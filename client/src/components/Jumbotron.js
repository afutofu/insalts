import React from "react";
import styled from "styled-components";

const JumbotronComp = styled.div`
    width: 100%;
    height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("https://cdn11.bigcommerce.com/s-dis4vxtxtc/images/stencil/1280x1280/products/1867/2397/image_1577__37264.1567254894.jpg?c=2?imbypass=on");
    background-size: contain;
    margin-bottom: 40px;
`;

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 55px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
`;

const Desc = styled.p`
    font-size: 18px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 5px 15px;
    font-weight: 500;
`;

const JumbotronSaltsComp = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("https://media.istockphoto.com/photos/background-of-white-sea-salt-picture-id184342915?k=6&m=184342915&s=612x612&w=0&h=iV9PtQwXQ2lnnIP_Bvzk3UwUg37tpDS0Zzgl-3wyRW4=");
    margin-bottom: 50px;
`;

const ContainerSalts = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const TitleSalts = styled.h1`
    margin: 0;
    font-size: 30px;
    font-weight: 500;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
`;

const DescSalts = styled.p`
    margin: 0;
    font-size: 16px;
    /* background-color: rgba(255, 255, 255, 0.9); */
    border-radius: 15px;
    font-weight: 500;
`;

const Jumbotron = props => {
    const home = (
        <JumbotronComp>
            <Container>
                <Title>Insult of the Week</Title>
                <Desc>"Yo momma's so fat not even dora can explore her."</Desc>
            </Container>
        </JumbotronComp>
    );

    const salts = (
        <JumbotronSaltsComp>
            <ContainerSalts>
                <TitleSalts>Check Out All The Salts</TitleSalts>
                <DescSalts>
                    Browse the saltiest salts. Find which one you like and start
                    insalting
                </DescSalts>
            </ContainerSalts>
        </JumbotronSaltsComp>
    );

    return props.salts ? salts : home;
};

export default Jumbotron;
