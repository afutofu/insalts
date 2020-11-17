import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import validator from "validator";

import { createSalt } from "../store/actions/salt";
import { saltModalToggle } from "../store/actions/modal";

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

const SaltModalComp = styled.div`
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

const SaltBox = styled.div`
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
`;

const TextArea = styled.textarea.attrs((props) => ({
  type: props.type ?? "text",
  name: props.name ?? "name",
  placeholder: props.placeholder ?? "",
}))`
  position: relative;
  width: 100%;
  height: 100px;
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
  resize: none;
  line-height: 1.5em;

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

const SaltButton = styled.button`
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
const SaltModal = (props) => {
  const initialSaltData = {
    name: "",
    title: "",
    description: "",
  };
  const [saltData, setSaltData] = useState(initialSaltData);
  const [error, setError] = useState("");
  const [saltDataErrors, setSaltDataErrors] = useState(initialSaltData);
  const { modalOpen, createSalt, toggleModal } = props;

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

  const validateInputs = (name, title, description) => {
    let saltDataErrors = {
      name: "",
      title: "",
      description: "",
    };

    // Check if name is alphanumeric
    if (!validator.isAlpha(name)) {
      saltDataErrors.name = "Must only contain letters";
    }

    // Check if title is alphanumeric
    if (!validator.isAlphanumeric(validator.blacklist(title, " "))) {
      saltDataErrors.title = "Must only contain letters and numbers";
    }

    // Check if any fields are empty
    for (const key in saltData) {
      if (validator.isEmpty(saltData[key])) {
        saltDataErrors[key] = "Field must not be empty";
      }
    }

    if (isValidated(saltDataErrors)) {
      setSaltDataErrors(initialSaltData);
      return true;
    } else {
      setSaltDataErrors(saltDataErrors);
      return false;
    }
  };

  const resetErrors = () => {
    setError("");
    setSaltDataErrors(initialSaltData);
  };

  const onModalClose = (e) => {
    if (e) {
      e.preventDefault();
    }
    setSaltData(initialSaltData);
    resetErrors();
    toggleModal();
  };

  const onCreateSalt = (e) => {
    e.preventDefault();
    resetErrors();
    const { name, title, description } = saltData;
    const isValidated = validateInputs(name, title, description);

    if (isValidated) {
      createSalt(name, title, description)
        .then(() => {
          onModalClose();
        })
        .catch((error) => {
          if (error.type === "VALIDATION") {
            setSaltDataErrors(error.errors);
          } else {
            setError(error.msg);
          }
        });
    }
  };

  return (
    <SaltModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={onModalClose} />
      <SaltBox>
        <Form onSubmit={onCreateSalt}>
          <Container>
            <Title>
              create salt <Error>{error}</Error>
            </Title>

            <Header>
              name <Error>{saltDataErrors.name}</Error>
            </Header>
            <Input
              onChange={(e) => {
                e.persist();
                setSaltData((prevData) => {
                  return {
                    ...prevData,
                    name: e.target.value.toLowerCase().trim(),
                  };
                });
              }}
              name="name"
              placeholder="yomama will be s/yomama"
              value={saltData.name}
            />

            <Header>
              title <Error>{saltDataErrors.title}</Error>
            </Header>
            <Input
              onChange={(e) => {
                e.persist();
                setSaltData((prevData) => {
                  return {
                    ...prevData,
                    title: e.target.value,
                  };
                });
              }}
              name="title"
              placeholder="Yo Mama"
              value={saltData.title}
            />

            <Header>
              description <Error>{saltDataErrors.description}</Error>
            </Header>
            <TextArea
              onChange={(e) => {
                e.persist();
                setSaltData((prevData) => {
                  return {
                    ...prevData,
                    description: e.target.value,
                  };
                });
              }}
              name="description"
              placeholder="Yo mama so smart, she made you join this salt"
              value={saltData.description}
            ></TextArea>
          </Container>
          <ButtonContainer>
            <SaltButton>Create</SaltButton>
            <CancelButton onClick={onModalClose}>Cancel</CancelButton>
          </ButtonContainer>
        </Form>
      </SaltBox>
    </SaltModalComp>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modal.salt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSalt: (name, title, description) =>
      dispatch(createSalt(name, title, description)),
    toggleModal: () => dispatch(saltModalToggle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaltModal);
