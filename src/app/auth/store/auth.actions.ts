import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{
    email: string,
    password: string,
  }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    email: string,
    _id: string,
    token: string,
    expirationDate: Date,
    msg: string,
    redirect: boolean
  }>()
);

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{
    email: string,
    password: string,
    passwordConfirmation: string
  }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{
    msg: string
  }>()
);

export const authenticateFail = createAction(
  '[Auth] Authenticate Fail',
  props<{
    error: {
      error: {
        status: number,
        msg: string
      }
    }
  }>()
);

export const autoLogin = createAction(
  '[Auth] Auto Login'
);

export const autoLoginFail = createAction(
  '[Auth] Auto Login Fail'
);

export const logout = createAction(
  '[Auth] Logout'
);
