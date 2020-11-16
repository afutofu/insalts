import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import validator from "validator";

import { login } from "../store/actions/auth";
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
  display: flex;
  align-items: center;
`;

const Header = styled.h3`
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-weight: 500;

  display: flex;
`;

const Error = styled.p`
  margin: 0;
  font-size: 10px;
  color: red;
  margin-left: 10px;
  text-transform: capitalize;
  font-weight: 400;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Input = styled.input.attrs((props) => ({
  type: props.type ?? "text",
  name: props.name ?? "username",
}))`
  position: relative;
  width: 100%;
  height: 45px;
  padding: 10px 20px;
  border-radius: 10px;
  color: #222;
  background-color: #fff;
  outline: none;
  border: 1px #fff solid;
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
  const [error, setError] = useState("");

  const initialLoginDataErrors = {
    email: "",
    password: "",
  };
  const [loginDataErrors, setLoginDataErrors] = useState(
    initialLoginDataErrors
  );

  const { login, modalOpen, toggleModal } = props;

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
      setLoginDataErrors(initialLoginDataErrors);
      return true;
    } else {
      setLoginDataErrors(loginDataErrors);
      return false;
    }
  };

  const onLogin = (e) => {
    e.preventDefault();

    // Attempt login
    resetErrors();

    const isValidated = validateInputs(email, password);

    if (isValidated) {
      login(email, password)
        .then(() => {
          onModalClose();
        })
        .catch((error) => {
          if (error.type === "VALIDATION") {
            setLoginDataErrors(error.errors);
          } else {
            setError(error.msg);
          }
        });
    }
  };

  const resetErrors = () => {
    setError("");
    setLoginDataErrors(initialLoginDataErrors);
  };

  const onModalClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    toggleModal();
  };

  return (
    <LoginModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={() => onModalClose()} />
      <LoginBox>
        <Form onSubmit={onLogin}>
          <Container>
            <Title>
              login <Error>{error}</Error>
            </Title>

            <Header>
              email <Error>{loginDataErrors.email}</Error>
            </Header>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              value={email}
            />
            <Header>
              password <Error>{loginDataErrors.password}</Error>
            </Header>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              value={password}
            />
          </Container>
          <ButtonContainer>
            <LoginButton onClick={onLogin}>Login</LoginButton>
            <CancelButton onClick={() => onModalClose()}>Cancel</CancelButton>
          </ButtonContainer>
        </Form>
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
    login: (email, password) => dispatch(login(email, password)),
    toggleModal: () => dispatch(loginModalToggle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
