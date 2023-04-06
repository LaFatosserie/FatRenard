import CONST from '../redux/constants'
import { UserStatus } from './App'

/**
 * Type
 */
export type Player = {
  _id: number
  username: string
  firstname: string
  lastname: string
  status: UserStatus
}

/**
 * REDUX ACTIONS
 */
export interface ILoadAPlayer {
  type: typeof CONST.PLAYERS.LOAD_ONE,
  player: Player
}

export interface LoadPlayersFromGame {
  type: typeof CONST.PLAYERS.LOAD_FROM_GAME
  players: Player[]
}

export type PlayerActionTypes = ILoadAPlayer | LoadPlayersFromGame;