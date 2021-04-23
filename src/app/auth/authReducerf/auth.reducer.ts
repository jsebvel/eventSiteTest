import { createReducer, on } from "@ngrx/store";
import { SessionUser } from "src/models/sessionUser";
import { setUser, unsetUser } from "./auth.actions";


export interface State {
  user: SessionUser;
}

export const initialState: State = {
  user: null,
}

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user })),
  on(unsetUser, (state) => ({ ...state, user: null }))
)

export function authReducer(state, action) {
  return _authReducer(state, action);
}
