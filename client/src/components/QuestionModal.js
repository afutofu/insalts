import React from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

import { questionModalToggle } from "../store/actions/modal";

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

const QuestionModalComp = styled.div`
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

const QuestionBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  /* width: 600px; */
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
  font-size: 20px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  width: 100%;
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

const Button = styled.button`
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
const QuestionModal = (props) => {
  const { data, modalOpen, toggleModal } = props;

  if (modalOpen) firstRender = false;

  const onModalClose = (e) => {
    if (e) {
      e.preventDefault();
    }
    toggleModal();
  };

  return (
    <QuestionModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={onModalClose} />
      <QuestionBox>
        <Container>
          <Title>{data.question}</Title>
        </Container>
        <ButtonContainer>
          {data.options &&
            data.options.map((option, i) => {
              return (
                <Button
                  key={i}
                  onClick={async () => {
                    await option.onClick();
                    onModalClose();
                  }}
                >
                  {option.text}
                </Button>
              );
            })}
          <CancelButton onClick={onModalClose}>Cancel</CancelButton>
        </ButtonContainer>
      </QuestionBox>
    </QuestionModalComp>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modal.question,
    data: state.modal.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(questionModalToggle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionModal);
