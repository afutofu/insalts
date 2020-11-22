import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import validator from "validator";

import { createSalt, editSalt } from "../store/actions/salt";
import { createPost } from "../store/actions/post";
import { postModalToggle } from "../store/actions/modal";

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

const PostModalComp = styled.div`
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

const PostBox = styled.div`
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

const PostButton = styled.button`
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
  const { modalOpen, data, createPost, toggleModal } = props;

  let initialSaltData = {
    title: "",
    content: "",
  };

  const [postData, setPostData] = useState(initialSaltData);
  const [error, setError] = useState("");
  const [postDataErrors, setPostDataErrors] = useState(initialSaltData);

  if (modalOpen) firstRender = false;

  useEffect(() => {
    if (data && data.type === "edit") {
      setPostData({
        title: data.title,
        content: data.content,
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

  const validateInputs = (title) => {
    let postDataErrors = {
      title: "",
      content: "",
    };

    // Check if title is alphanumeric
    if (!validator.isAlphanumeric(validator.blacklist(title, " '"))) {
      postDataErrors.title = "Must only contain letters and numbers";
    }

    // Check if any fields are empty
    for (const key in postData) {
      if (validator.isEmpty(postData[key])) {
        postDataErrors[key] = "Field must not be empty";
      }
    }

    if (isValidated(postDataErrors)) {
      setPostDataErrors(initialSaltData);
      return true;
    } else {
      setPostDataErrors(postDataErrors);
      return false;
    }
  };

  const resetErrors = () => {
    setError("");
    setPostDataErrors(initialSaltData);
  };

  const onModalClose = (e) => {
    if (e) {
      e.preventDefault();
    }
    setPostData(initialSaltData);
    resetErrors();
    toggleModal();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resetErrors();
    const { title, content } = postData;
    const { saltName } = data;
    const isValidated = validateInputs(title, content);

    if (isValidated) {
      if (data && data.type === "edit") {
        // editSalt(name, title, content)
        //   .then(() => {
        //     onModalClose();
        //   })
        //   .catch((error) => {
        //     if (error.type === "VALIDATION") {
        //       setPostDataErrors(error.errors);
        //     } else {
        //       setError(error.msg);
        //     }
        //   });
      } else {
        createPost(title, content, saltName)
          .then(() => {
            onModalClose();
          })
          .catch((error) => {
            if (!error) {
              setError("Oops, something went wrong");
            } else if (error && error.type === "VALIDATION") {
              setPostDataErrors(error.errors);
            } else {
              setError(error.msg);
            }
          });
      }
    }
  };

  return (
    <PostModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={onModalClose} />
      <PostBox>
        <Form onSubmit={onSubmit}>
          <Container>
            <Title>
              {data && data.type === "edit" ? "edit post" : "create post"}{" "}
              <Error>{error}</Error>
            </Title>

            <Header>
              title <Error>{postDataErrors.title}</Error>
            </Header>
            <Input
              onChange={(e) => {
                e.persist();
                setPostData((prevData) => {
                  return {
                    ...prevData,
                    title: e.target.value,
                  };
                });
              }}
              name="title"
              value={postData.title}
            />

            <Header>
              content <Error>{postDataErrors.content}</Error>
            </Header>
            <TextArea
              onChange={(e) => {
                e.persist();
                setPostData((prevData) => {
                  return {
                    ...prevData,
                    content: e.target.value,
                  };
                });
              }}
              name="content"
              value={postData.content}
            ></TextArea>
          </Container>
          <ButtonContainer>
            <PostButton>
              {" "}
              {data && data.type === "edit" ? "edit" : "create"}
            </PostButton>
            <CancelButton onClick={onModalClose}>Cancel</CancelButton>
          </ButtonContainer>
        </Form>
      </PostBox>
    </PostModalComp>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modal.post,
    data: state.modal.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (title, content, saltName) =>
      dispatch(createPost(title, content, saltName)),
    createSalt: (title, content) => dispatch(createSalt(title, content)),
    editSalt: (title, content) => dispatch(editSalt(title, content)),
    toggleModal: () => dispatch(postModalToggle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaltModal);
