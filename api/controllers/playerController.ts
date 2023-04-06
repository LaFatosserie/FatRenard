import { fetchApi } from "../fetchApi";
import { Player } from "../../types/Player";

/**
 * PLAYER
 */
class PlayerController {
  private BASE_ENDPOINT = '/users';

  async getOne(playerId: string) {
    const player = await fetchApi<Player>({
      endpoint: `${this.BASE_ENDPOINT}/${playerId}`,
      method: 'GET'
    })
    return player
  }

  async getFromGame(gameId: string) {
    const players = await fetchApi<Player[]>({
      endpoint: `games/${gameId}/players`,
      method: 'GET'
    })
    return players;
  }
}

export default PlayerController