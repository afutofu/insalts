import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import validator from "validator";

import { createSalt, editSalt } from "../store/actions/salt";
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
  border-radius: 5px;
  overflow: hidden;

  @media only screen and (max-width: 600px) {
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

const TextArea = styled.textarea.attrs((props) => ({
  type: props.type ?? "text",
  name: props.name ?? "name",
  placeholder: props.placeholder ?? "",
}))`
  position: relative;
  width: 100%;
  height: 120px;
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

  @media only screen and (max-width: 600px) {
    padding: 10px 15px;
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

const SaltButton = styled.button`
  border: none;
  outline: none;
  background-color: #b64e1f;
  color: #ddd;
  margin-right: 20px;
  text-transform: capitalize;

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
  const { modalOpen, data, createSalt, editSalt, toggleModal } = props;

  let initialSaltData = {
    name: "",
    title: "",
    description: "",
  };

  const [saltData, setSaltData] = useState(initialSaltData);
  const [error, setError] = useState("");
  const [saltDataErrors, setSaltDataErrors] = useState(initialSaltData);

  if (modalOpen) firstRender = false;

  useEffect(() => {
    if (data && data.type === "edit") {
      setSaltData({
        name: data.name,
        title: data.title,
        description: data.description,
      });
    }
  }, [data]);

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

  const validateInputs = (name, title) => {
    let saltDataErrors = {
      name: "",
      title: "",
      description: "",
    };

    // Check if name is alpha
    if (name && !validator.isAlpha(name)) {
      saltDataErrors.name = "Must only contain letters";
    }

    // Check if title is alphanumeric
    if (!validator.isAlphanumeric(validator.blacklist(title, " "))) {
      saltDataErrors.title = "Must only contain letters and numbers";
    }

    // Check if any fields are empty
    for (const key in saltData) {
      if (key === "description") continue;
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

  const onSubmit = (e) => {
    e.preventDefault();
    resetErrors();
    const { name, title, description } = saltData;
    const isValidated = validateInputs(name, title, description);

    if (isValidated) {
      if (data && data.type === "edit") {
        editSalt(name, title, description)
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
      } else {
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
    }
  };

  return (
    <SaltModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={onModalClose} />
      <SaltBox>
        <Form onSubmit={onSubmit}>
          <Container>
            <Title>
              {data && data.type === "edit" ? "edit salt" : "create salt"}{" "}
              <Error>{error}</Error>
            </Title>

            {data && data.type === "edit" ? null : (
              <>
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
              </>
            )}

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
            <SaltButton>
              {" "}
              {data && data.type === "edit" ? "edit" : "create"}
            </SaltButton>
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
    data: state.modal.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSalt: (name, title, description) =>
      dispatch(createSalt(name, title, description)),
    editSalt: (name, title, description) =>
      dispatch(editSalt(name, title, description)),
    toggleModal: () => dispatch(saltModalToggle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaltModal);
