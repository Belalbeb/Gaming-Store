import { createReducer, on } from "@ngrx/store";
import { changeIsOpen } from "./isOpen.action";

export const openReducer = createReducer(
  false,

  on(changeIsOpen, (state: boolean) => {
    const newState = !state;

    return newState;
  }),

);