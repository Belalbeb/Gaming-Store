import { createAction, props } from "@ngrx/store";

export const updateFiltertext=createAction("updateText",props<{text:string}>())