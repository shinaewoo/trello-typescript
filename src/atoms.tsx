import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [
      { id: 1, text: "Go to pilates" },
      { id: 2, text: "Go to buy bread" },
    ],
    Doing: [{ id: 3, text: "Do homework" }],
    Done: [{ id: 4, text: "Do the laundry" }],
  },
});
