import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

import { register } from "../store/actions/auth";
import { registerModalToggle } from "../store/actions/modal";

const modalFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%)
  }
  1%{
    opacity:0;
    transform:translateX(0%);
  }
  100%{
    opacity:1;
    transform: translateX(0%)
  }
`;

const modalFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0%)
  }
  99%{
    opacity:0;
    transform: translateX(0%)
  }
  100%{
    opacity:0;
    transform: translateX(100%)
  }
`;

const ButtonContainerHeight = "80px";
const horizontalPadding = "25px";

const RegisterModalComp = styled.div`
    position: fixed;
    color: #222;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    transform: translateX(-100%);
    opacity: 0;

    animation: ${props =>
            props.modalOpen
                ? modalFadeIn
                : props.firstRender
                ? "none"
                : modalFadeOut}
        0.25s forwards;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 150;
`;

const RegisterBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 400px;
    background-color: #eee;
    font-family: "Montserrat", "san-serif";
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-bottom: ${ButtonContainerHeight};
    box-sizing: border-box;
    z-index: 200;
    border-radius: 10px;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: ${horizontalPadding};
    padding-bottom: 0;
    box-sizing: border-box;
`;

const Title = styled.h1`
    text-transform: uppercase;
    font-size: 22px;
    margin-bottom: 25px;
`;

const Header = styled.h3`
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 10px;
    font-weight: 500;

    display: flex;
`;

const Input = styled.input.attrs(props => ({
    type: props.type ?? "text"
}))`
    position: relative;
    width: 100%;
    height: 45px;
    padding: 10px 20px;
    border-radius: 10px;
    color: #222;
    background-color: #fff;
    outline: none;
    border: none;
    box-sizing: border-box;
    font-size: 12px;
    font-family: "Montserrat", "san-serif";
    margin: 0;
    margin-bottom: 20px;
`;

const Error = styled.p`
    margin: 0;
    font-size: 10px;
    color: red;
    margin-left: 10px;
    text-transform: capitalize;
    font-weight: 400;
`;

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${ButtonContainerHeight};
    background-color: #ddd;
    border-radius: 0 0 10px 10px;
    padding: ${horizontalPadding};
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    button {
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-family: "Montserrat", "san-serif";
        box-sizing: border-box;
        font-weight: 500;
    }
`;

const RegisterButton = styled.button`
    border: none;
    outline: none;
    background-color: #b64e1f;
    color: #ddd;
    margin-right: 20px;

    transition: 0.2s;
    :hover {
        outline: none;
        background-color: #e98455;
    }

    :focus {
        outline: none;
    }

    :active {
        outline: none;
        background-color: #b64e1f;
    }
`;

const CancelButton = styled.button`
    border: none;
    outline: none;
    background: none;
    color: #222;

    :hover {
        text-decoration: underline;
    }
    :focus {
        outline: none;
    }
`;

let firstRender = true;
const RegisterModal = props => {
    const initialRegisterData = {
        username: "",
        email: "",
        password: "",
        rePassword: ""
    };
    const initialRegisterDataError = {
        username: "",
        email: "",
        password: "",
        rePassword: ""
    };
    const [registerData, setRegisterData] = useState(initialRegisterData);
    const [registerDataError, setRegisterDataError] = useState(
        initialRegisterDataError
    );
    const { register, modalOpen, toggleModal } = props;

    if (modalOpen) firstRender = false;

    const onRegister = () => {
        const { username, email, password } = registerData;
        register(username, email, password)
            .then()
            .catch();
    };

    const onModalClose = () => {
        setRegisterData(initialRegisterData);
        toggleModal();
    };

    return (
        <RegisterModalComp modalOpen={modalOpen} firstRender={firstRender}>
            <Backdrop onClick={() => onModalClose()} />
            <RegisterBox>
                <Container>
                    <Title>login</Title>
                    <Header>
                        username <Error>{registerDataError.username}</Error>
                    </Header>
                    <Input
                        onChange={e => {
                            e.persist();
                            setRegisterData(prevData => {
                                return {
                                    ...prevData,
                                    username: e.target.value
                                };
                            });
                        }}
                        value={registerData.username}
                        onKeyPress={e => {
                            if (e.key === "Enter") onRegister();
                        }}
                    />

                    <Header>
                        email<Error>{registerDataError.email}</Error>
                    </Header>
                    <Input
                        onChange={e => {
                            e.persist();
                            setRegisterData(prevData => {
                                return {
                                    ...prevData,
                                    email: e.target.value
                                };
                            });
                        }}
                        value={registerData.email}
                        onKeyPress={e => {
                            if (e.key === "Enter") onRegister();
                        }}
                    />

                    <Header>
                        password<Error>{registerDataError.password}</Error>
                    </Header>
                    <Input
                        type={"password"}
                        onChange={e => {
                            e.persist();
                            setRegisterData(prevData => {
                                return {
                                    ...prevData,
                                    password: e.target.value
                                };
                            });
                        }}
                        value={registerData.password}
                        onKeyPress={e => {
                            if (e.key === "Enter") onRegister();
                        }}
                    />

                    <Header>
                        retype password
                        <Error>{registerDataError.rePassword}</Error>
                    </Header>
                    <Input
                        type={"password"}
                        onChange={e => {
                            e.persist();
                            setRegisterData(prevData => {
                                return {
                                    ...prevData,
                                    rePassword: e.target.value
                                };
                            });
                        }}
                        value={registerData.rePassword}
                        onKeyPress={e => {
                            if (e.key === "Enter") onRegister();
                        }}
                    />
                </Container>
                <ButtonContainer>
                    <RegisterButton onClick={() => onRegister()}>
                        Register
                    </RegisterButton>
                    <CancelButton onClick={() => onModalClose()}>
                        Cancel
                    </CancelButton>
                </ButtonContainer>
            </RegisterBox>
        </RegisterModalComp>
    );
};

const mapStateToProps = state => {
    return {
        modalOpen: state.modal.register
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: (username, email, password) =>
            dispatch(register(username, email, password)),
        toggleModal: () => dispatch(registerModalToggle())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
