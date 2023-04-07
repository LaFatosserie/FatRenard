import { WithId } from "./Doc";

export enum GameStatus {
  Created = 'CREATED',
  WaitingForPlayers = 'WAITING',
  Ready = 'READY',
  InGame = 'IN_GAME',
  Finished = 'FINISHED',
}

export type GameCreation = {
  name: string,
  playersId: string[],
  zoneId: string,
  time: number,
  public: boolean
}

export type TGame = {
  name: string,
  date: Date,
  foxId: string;
  playersId: string[];
  zoneId: string;
  status: GameStatus,
  code: string;
  time: number;
  public: boolean;
};

export type Game = TGame & WithId
