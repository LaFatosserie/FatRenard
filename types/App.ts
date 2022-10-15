import { TGame } from "./Game";
import { TUser } from "./User";

export enum MODALS {
  SIGN_IN = "SIGN_IN",
  MENU = "USER",
}

export type TKey = string | number | undefined;

export type TSnackNotification = {
  message: string;
  options: OptionsObject;
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

export interface IAppState {
  ready: boolean;
  modal: null | {
    name: MODALS;
    params: any;
  };
  playerType: EPlayerType | undefined;
  user: undefined | TUser;
  loggedIn: boolean;
  game: TGame;
}
