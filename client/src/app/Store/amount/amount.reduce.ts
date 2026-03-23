import { createReducer, on } from "@ngrx/store";
import { amountAction } from "./amount.action";


export const amountReducer = createReducer(
 0,
  on(amountAction, (state, { amount }) => {
    state=amount;
    return state
  })
);