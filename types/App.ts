import { TGame } from "./Game";
import { TUser } from "./User";
import CONST from '../redux/constants'
import { Player } from "./Player";

export enum MODALS {
  SIGN_IN = "SIGN_IN",
  MENU = "USER",
}

export type TKey = string | number | undefined;

export enum UserStatus {
  Online = 'ONLINE',
  Disconnected = 'DISCONNECTED',
  Disabled = 'DISABLED',
  InGame = 'InGame'
}

export type TSnackNotification = {
  message: string;
  options: any;
  key?: string;
  dismissed?: boolean;
};

export type EntityState = {
  status: "idle" | "errored" | "succeded" | "loading";
  error: null | string;
};

export enum EPlayerType {
  CHASED = "CHASED",
  HUNTER = "HUNTER",
}

export interface User extends Player {
  admin: boolean,
  token: string,
  email: string
}

export interface LoginAction {
  type: typeof CONST.LOGIN;
  user: User;
}

export interface LogoutAction {
  type: typeof CONST.LOGOUT;
}

export type AuthActionTypes =
  | LoginAction
  | LogoutAction

export interface IAppState {
  ready: boolean;
  modal: null | {
    name: MODALS;
    params: any;
  };
  error?: string;
  playerType: EPlayerType | undefined;
  user: undefined | User;
  loggedIn: boolean;
  game: TGame;
  authLoading: boolean
}
