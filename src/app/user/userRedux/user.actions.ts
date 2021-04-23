import { createAction, props } from "@ngrx/store";

export const updateUserId = createAction('[User] updateId',
props<{id: string}>());

export const getUserId = createAction('[User] getId');
