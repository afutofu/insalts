import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import validator from "validator";

import { loginModalToggle } from "../store/actions/modal";

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

const LoginModalComp = styled.div`
  position: fixed;
  color: #222;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  transform: translateX(-100%);
  opacity: 0;

  animation: ${(props) =>
      props.modalOpen ? modalFadeIn : props.firstRender ? "none" : modalFadeOut}
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

const LoginBox = styled.div`
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
`;

const Input = styled.input.attrs((props) => ({
  type: props.type ?? "text",
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

  :focus {
    border: 1px #e98455 solid;
  }
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

const LoginButton = styled.button`
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
const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginDataErrors, setLoginDataErrors] = useState({
    email: "",
    password: "",
  });

  const { modalOpen, toggleModal } = props;

  if (modalOpen) firstRender = false;

  const isValidated = (errors) => {
    let isValidated = true;

    // Check if there are no errors
    for (const key in errors) {
      if (!validator.isEmpty(errors[key])) {
        isValidated = false;
      }
    }

    return isValidated;
  };

  const validateInputs = (email) => {
    let loginDataErrors = {
      email: "",
      password: "",
    };

    // Check if email is correct format
    if (!validator.isEmail(email)) {
      loginDataErrors.email = "Incorrect format";
    }

    // Check if email field is empty
    if (validator.isEmpty(email)) {
      loginDataErrors.email = "Field must not be empty";
    }

    // Check if password field is empty
    if (validator.isEmpty(password)) {
      loginDataErrors.password = "Field must not be empty";
    }

    if (isValidated(loginDataErrors)) {
      return true;
    } else {
      setLoginDataErrors(loginDataErrors);
      return false;
    }
  };

  const onLogin = () => {
    // Attempt login
    const isValidated = validateInputs(email, password);

    if (isValidated) {
      // login(email, password)
      //   .then(() => {
      //     onModalClose();
      //   })
      //   .catch((errors) => {
      //     setLoginDataErrors(errors);
      //   });
    }
  };

  const onModalClose = () => {
    setEmail("");
    setPassword("");
    toggleModal();
  };

  return (
    <LoginModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={() => onModalClose()} />
      <LoginBox>
        <Container>
          <Title>login</Title>
          <Header>email</Header>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onKeyPress={(e) => {
              if (e.key === "Enter") onLogin();
            }}
          />
          <Header>password</Header>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onKeyPress={(e) => {
              if (e.key === "Enter") onLogin();
            }}
          />
        </Container>
        <ButtonContainer>
          <LoginButton onClick={() => onLogin()}>Login</LoginButton>
          <CancelButton onClick={() => onModalClose()}>Cancel</CancelButton>
        </ButtonContainer>
      </LoginBox>
    </LoginModalComp>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modal.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // login: (email, password) => dispatch(login(email, password)),
    toggleModal: () => dispatch(loginModalToggle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
