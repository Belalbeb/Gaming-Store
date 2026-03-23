import { createAction, props } from "@ngrx/store";

export const amountAction=createAction("AmountAction",props<{amount:number}>())