import { createAction, props } from "@ngrx/store";


export const setIsLoading = createAction('[Loading] setLoading',
props<{loading: boolean}>());
