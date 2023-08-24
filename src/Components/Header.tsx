import React from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { styled } from "styled-components";
import { boardModalState } from "../atoms";
import { useSetRecoilState } from "recoil";

const HeaderWrap = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  padding: 1rem 1.4rem;
  border-bottom: 2px solid #f4d160;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dfe6e9;
  font-size: 1.4rem;
  font-weight: bold;
`;

const AddBoardBtn = styled.button`
  font-size: 1.5rem;
  background-color: transparent;
  color: #f4d160;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Header() {
  const setBoardModalState = useSetRecoilState(boardModalState);
  const addBoard = () => setBoardModalState(true);

  return (
    <>
      <HeaderWrap>
        <Title>My Trello</Title>
        <AddBoardBtn onClick={addBoard}>
          <BsFillPlusSquareFill />
        </AddBoardBtn>
      </HeaderWrap>
    </>
  );
}
