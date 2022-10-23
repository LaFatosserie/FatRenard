import CONST from "redux/constants";

export type TLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

export type TUser = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  game: number
  created_at: Date
  updated_at: Date
  firstname: string;
  lastname: string;
  location: TLocation;
  lastPosTime: number;
};

// User
export interface IUserLoginAction {
  type: typeof CONST.USER_LOGIN;
  user: TUser;
  loggedIn: boolean;
}

export interface IUserLogoutAction {
  type: typeof CONST.USER_LOGOUT;
}

export interface IUserUpdateAction {
  type: typeof CONST.USER_UPDATE;
  user: TUser;
}

export interface IUserState {
  loggedIn: boolean;
  user: TUser | undefined;
}

export type TUserActionTypes =
  | IUserLoginAction
  | IUserLogoutAction
  | IUserUpdateAction;
