import CONST from '../redux/constants'
import { UserStatus } from './App'
import { WithId } from './Doc'

/**
 * Type
 */
export type TPlayer = {
  username: string
  firstname: string
  lastname: string
  status: UserStatus
}

export type Player = TPlayer & WithId

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