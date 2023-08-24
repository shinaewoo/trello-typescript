import React, { useState } from "react";
import { styled } from "styled-components";
import { MdClose } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boardModalState, toDoState } from "../atoms";
import ModalContainer from "./common/ModalContainer";

const Container = styled.div`
  width: 20rem;
  height: 13rem;
  background-color: #dadfe9;
  border-radius: 8px;
  border: 1px solid #b2bec3;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 2.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem;
  border-bottom: 1px solid #b2bec3;
`;

const Title = styled.div`
  width: 100%;
  color: #2d3436;
  font-weight: bold;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  color: #2d3436;
  font-size: 1rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  width: 100%;
  height: calc(100% - 2.6rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
`;

const InputWrap = styled.div`
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 90%;
  height: 2rem;
  border: none;
  border-radius: 4px;
`;

const ButtonWrap = styled.div``;

const Button = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  color: white;
  width: 6rem;
  height: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export default function AddBoardModal() {
  const [boardModalActive, setBoardModalActive] =
    useRecoilState(boardModalState);
  const closeModal = () => setBoardModalActive(false);
  const [boardName, setBoardName] = useState("");
  const setToDoState = useSetRecoilState(toDoState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };
  const handleCreate = () => {
    setToDoState((prev) => {
      return { ...prev, [boardName]: [] };
    });
    setBoardName("");
    setBoardModalActive(false);
  };
  return (
    <ModalContainer
      isOpen={boardModalActive}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <Container>
        <ModalHeader>
          <Title>Add a board</Title>
          <CloseBtn onClick={closeModal}>
            <MdClose />
          </CloseBtn>
        </ModalHeader>
        <ModalBody>
          <InputWrap>
            <Input type="text" value={boardName} onChange={handleChange} />
          </InputWrap>
          <ButtonWrap>
            <Button onClick={handleCreate}>Create Board</Button>
          </ButtonWrap>
        </ModalBody>
      </Container>
    </ModalContainer>
  );
}
