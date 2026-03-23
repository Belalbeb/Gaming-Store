import { createReducer, on } from "@ngrx/store";
import { decreaseCounter, increaseCounter } from "./counter.action";

const saved = localStorage.getItem('counter');
const initialState: number = saved ? Number(saved) : 0;

export const counterReducer = createReducer(
  initialState,

  on(increaseCounter, (state: number) => {
    const newState = state + 1;
    localStorage.setItem('counter', newState.toString());
    return newState;
  }),

  on(decreaseCounter, (state: number) => {
    const newState = state - 1;
    localStorage.setItem('counter', newState.toString());
    return newState;
  })
);
