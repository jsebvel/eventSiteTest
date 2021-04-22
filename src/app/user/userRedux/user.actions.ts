import { createAction, props } from "@ngrx/store";

export const updateUserId = createAction('[User] updateId',
props<{id: string}>());
