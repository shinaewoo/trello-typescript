import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import { MdClose } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Card = styled.div<{ $isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.$isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const DeleteCardBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-size: 0.8rem;
  position: absolute;
  top: auto;
  right: 0;
  cursor: pointer;
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DragabbleCard({
  index,
  toDoId,
  toDoText,
  boardId,
}: IDragabbleCardProps) {
  const setToDoState = useSetRecoilState(toDoState);
  const handleDelete = () => {
    setToDoState((prev) => {
      const newCardValues = prev[boardId].filter((card) => card.id !== toDoId);
      return { ...prev, [boardId]: newCardValues };
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>{toDoText}</div>
          <DeleteCardBtn onClick={handleDelete}>
            <MdClose />
          </DeleteCardBtn>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
