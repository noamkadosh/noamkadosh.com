import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | undefined;
  authError: {
    error: {
      status: number,
      msg: string
    }
  } | undefined;
  loading: boolean;
}

const initialState: State = {
  user: undefined,
  authError: undefined,
  loading: false
};

const _authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginStart,
    AuthActions.signupStart,
    (state) => ({
      ...state,
      authError: undefined,
      loading: true
    })
  ),
  on(
    AuthActions.loginSuccess,
    (state, action) => ({
      ...state,
      authError: undefined,
      loading: false,
      user: new User(
        action.email,
        action._id,
        action.token,
        action.expirationDate
      )
    })
  ),
  on(
    AuthActions.signupSuccess,
    (state, action) => ({
      ...state,
      authError: undefined,
      loading: false
    })
  ),
  on(
    AuthActions.authenticateFail,
    (state, action) => ({
      ...state,
      authError: action.error,
      loading: false
    })
  ),
  on(
    AuthActions.logout,
    (state, action) => ({
      ...state,
      user: undefined
    })
  )
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}
