import { createReducer, on } from "@ngrx/store";
import { getUserId, updateUserId } from "./user.actions";


export const initId='';

export interface IdState {
  id: string
}

const _updateId = createReducer(
  initId,
  on(updateUserId, (state, {id}) => state = id),
  on(getUserId, state => state)
);

export function updateId(state, action) {
  return _updateId(state, action);
}
