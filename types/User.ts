import CONST from "redux/constants";
import { User } from "./App";

export type TLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

// User
export interface IUserLoginAction {
  type: typeof CONST.LOGIN;
  user: User;
  loggedIn: boolean;
}

export interface IUserLogoutAction {
  type: typeof CONST.LOGOUT;
}

export interface IUserUpdateAction {
  type: typeof CONST.USER_UPDATE;
  user: User;
}

export interface IUserState {
  loggedIn: boolean;
  user: User | undefined;
}

export type TUserActionTypes =
  | IUserLoginAction
  | IUserLogoutAction
  | IUserUpdateAction;
