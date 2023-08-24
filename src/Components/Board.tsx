import React from "react";
import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi";
import { useSetRecoilState } from "recoil";
import {
  ITodo,
  editBoardModalState,
  selectedBoardId,
  toDoState,
} from "../atoms";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  width: 300px;
  min-width: 300px;
  height: 100%;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CountNum = styled.span`
  margin-left: 0.4rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #cdd1d8;
  font-weight: 400;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteBoardBtn = styled.button`
  font-size: 1rem;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpdateBoardBtn = styled.button`
  font-size: 1rem;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 28px;
  border: none;
  padding: 4px;
  &:focus {
    outline: none;
  }
`;

interface IAreaProps {
  $isDraggingFromThis: boolean;
  $isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  padding: 20px;
  flex-grow: 1;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#75C2F6"
      : props.$isDraggingFromThis
      ? "#FBEEAC"
      : "transparent"};
  transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const setEditBoardModalState = useSetRecoilState(editBoardModalState);
  const setSelectedBoardId = useSetRecoilState(selectedBoardId);
  const handleDelete = () => {
    setToDos((prev) => {
      const prevTodos = { ...prev };
      delete prevTodos[boardId];
      return prevTodos;
    });
  };
  const handleUpdate = () => {
    setEditBoardModalState(true);
    setSelectedBoardId(boardId);
  };
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <>
      <Wrapper>
        <BoardHeader>
          <CountNum>{toDos.length}</CountNum>
          <Title>{boardId}</Title>
          <Buttons>
            <UpdateBoardBtn onClick={handleUpdate}>
              <HiOutlinePencil />
            </UpdateBoardBtn>
            <DeleteBoardBtn onClick={handleDelete}>
              <RiDeleteBin6Line />
            </DeleteBoardBtn>
          </Buttons>
        </BoardHeader>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("toDo", { required: true })}
            type="text"
            placeholder={`Add task on ${boardId}`}
          />
        </Form>
        <Droppable droppableId={boardId}>
          {(provided, snapshot) => (
            <Area
              $isDraggingOver={snapshot.isDraggingOver}
              $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {toDos.map((toDo, index) => (
                <DragabbleCard
                  key={toDo.id}
                  index={index}
                  toDoId={toDo.id}
                  toDoText={toDo.text}
                  boardId={boardId}
                />
              ))}
              {provided.placeholder}
            </Area>
          )}
        </Droppable>
      </Wrapper>
    </>
  );
}
