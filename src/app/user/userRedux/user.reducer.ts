import { createReducer, on } from "@ngrx/store";
import { updateUserId } from "./user.actions";


export const initId='';

export interface IdState {
  id: string
}

const _updateId = createReducer(
  initId,
  on(updateUserId, (state, {id}) => id)
);

export function updateId(state, action) {
  return _updateId(state, action);
}
