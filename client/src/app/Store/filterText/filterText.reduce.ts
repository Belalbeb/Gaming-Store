import { createReducer, on } from "@ngrx/store";
import { updateFiltertext } from "./filterText.action";

export const filterTextReducer = createReducer(
 "",
  on(updateFiltertext, (state, {text}) => {
    state=text;
    return state
  })
);