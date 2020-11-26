import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import validator from "validator";

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
  border-radius: 5px;
  overflow: hidden;

  @media only screen and (max-width: 600px) {
    padding-bottom: 60px;
    width: 250px;
  }
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

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Header = styled.h3`
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-weight: 500;

  display: flex;
  align-items: center;

  @media only screen and (max-width: 600px) {
    font-size: 0.6rem;
  }
`;

const Error = styled.p`
  margin: 0;
  font-size: 10px;
  color: red;
  margin-left: 10px;
  text-transform: capitalize;
  font-weight: 400;

  @media only screen and (max-width: 600px) {
    font-size: 0.5rem;
  }
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
  name: props.name ?? "name",
  placeholder: props.placeholder ?? "",
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
  font-size: 14px;
  font-family: "Montserrat", "san-serif";
  margin: 0;
  margin-bottom: 20px;

  :focus {
    border: 1px #e98455 solid;
  }

  @media only screen and (max-width: 600px) {
    padding: 10px 15px;
    height: 35px;
    font-size: 0.6rem;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${ButtonContainerHeight};
  background-color: #ddd;
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

    @media only screen and (max-width: 600px) {
      padding: 7px 15px;
      font-size: 0.7rem;
    }
  }

  @media only screen and (max-width: 600px) {
    height: 60px;
    padding: 20px;
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

const RegisterModal = (props) => {
  const initialRegisterData = {
    username: "",
    email: "",
    password: "",
    rePassword: "",
  };
  const [registerData, setRegisterData] = useState(initialRegisterData);
  const [error, setError] = useState("");
  const [registerDataErrors, setRegisterDataErrors] = useState(
    initialRegisterData
  );
  const { register, modalOpen, toggleModal } = props;

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

  const validateInputs = (username, email, password, rePassword) => {
    let registerDataErrors = {
      username: "",
      email: "",
      password: "",
      rePassword: "",
    };

    // Check if username is at least 4 characters long
    if (!validator.isLength(username, { min: 4 })) {
      registerDataErrors.username = "Must be at least 4 characters long";
    }

    // Check if username is alphanumeric
    if (!validator.isAlphanumeric(username)) {
      registerDataErrors.username = "Must only contain letters and numbers";
    }

    // Check if email is correct format
    if (!validator.isEmail(email)) {
      registerDataErrors.email = "Incorrect format";
    }

    // Check if rePassword is same as password
    if (!validator.equals(rePassword, password)) {
      registerDataErrors.password = "Password does not match";
      registerDataErrors.rePassword = "Password does not match";
    }

    // Check if password is at least 6 characters long
    if (!validator.isLength(password, { min: 6 })) {
      registerDataErrors.password = "Must be at least 6 characters long";
      registerDataErrors.rePassword = "Must be at least 6 characters long";
    }

    // Check if any fields are empty
    for (const key in registerData) {
      if (validator.isEmpty(registerData[key])) {
        registerDataErrors[key] = "Field must not be empty";
      }
    }

    if (isValidated(registerDataErrors)) {
      setRegisterDataErrors(initialRegisterData);
      return true;
    } else {
      setRegisterDataErrors(registerDataErrors);
      return false;
    }
  };

  const onRegister = (e) => {
    e.preventDefault();
    resetErrors();
    const { username, email, password, rePassword } = registerData;
    const isValidated = validateInputs(username, email, password, rePassword);

    if (isValidated) {
      register(username, email, password, rePassword)
        .then(() => {
          onModalClose();
        })
        .catch((error) => {
          if (error.type === "VALIDATION") {
            setRegisterDataErrors(error.errors);
          } else if (error.type === "EMAIL_TAKEN") {
            setError(error.msg);
          }
        });
    }
  };

  const resetErrors = () => {
    setError("");
    setRegisterDataErrors(initialRegisterData);
  };

  const onModalClose = (e) => {
    if (e) {
      e.preventDefault();
    }
    setRegisterData(initialRegisterData);
    resetErrors();
    toggleModal();
  };

  return (
    <RegisterModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={onModalClose} />
      <RegisterBox>
        <Form onSubmit={onRegister}>
          <Container>
            <Title>
              register <Error>{error}</Error>
            </Title>

            <Header>
              username <Error>{registerDataErrors.username}</Error>
            </Header>
            <Input
              onChange={(e) => {
                e.persist();
                setRegisterData((prevData) => {
                  return {
                    ...prevData,
                    username: e.target.value,
                  };
                });
              }}
              value={registerData.username}
            />

            <Header>
              email<Error>{registerDataErrors.email}</Error>
            </Header>
            <Input
              onChange={(e) => {
                e.persist();
                setRegisterData((prevData) => {
                  return {
                    ...prevData,
                    email: e.target.value,
                  };
                });
              }}
              type="email"
              name="email"
              value={registerData.email}
            />

            <Header>
              password<Error>{registerDataErrors.password}</Error>
            </Header>
            <Input
              onChange={(e) => {
                e.persist();
                setRegisterData((prevData) => {
                  return {
                    ...prevData,
                    password: e.target.value,
                  };
                });
              }}
              type="password"
              name="password"
              value={registerData.password}
            />

            <Header>
              retype password
              <Error>{registerDataErrors.rePassword}</Error>
            </Header>
            <Input
              onChange={(e) => {
                e.persist();
                setRegisterData((prevData) => {
                  return {
                    ...prevData,
                    rePassword: e.target.value,
                  };
                });
              }}
              type="password"
              name="password"
              value={registerData.rePassword}
            />
          </Container>
          <ButtonContainer>
            <RegisterButton onClick={onRegister}>Register</RegisterButton>
            <CancelButton onClick={onModalClose}>Cancel</CancelButton>
          </ButtonContainer>
        </Form>
      </RegisterBox>
    </RegisterModalComp>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modal.register,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (username, email, password, rePassword) =>
      dispatch(register(username, email, password, rePassword)),
    toggleModal: () => dispatch(registerModalToggle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
