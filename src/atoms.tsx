import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const boardModalState = atom<boolean>({
  key: "boardModalState",
  default: false,
});

export const editBoardModalState = atom<boolean>({
  key: "editBoardModalState",
  default: false,
});

export const selectedBoardId = atom<string>({
  key: "selectedBoardId",
  default: "",
});

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
  effects: [localStorageEffect("ToDos")],
});
