import { createReducer, on } from "@ngrx/store";
import { setIsLoading } from './authStore.actions';

export const initLoading = false;

export interface authStore {
  loading: boolean
}

const _setIsloading = createReducer(
  initLoading,
  on(setIsLoading, (state, {loading}) => loading)
);

export function setIsloading(state, action) {
  return _setIsloading(state, action);
}
