import { fetchApi } from "api/fetchApi";
import { TGame } from "types/Game";

/**
 * GAMES
 */
class GamesController {
  private BASE_ENDPOINT = '/games';

  async getAll() {
    const games = await fetchApi<TGame[]>({
      endpoint: this.BASE_ENDPOINT,
      method: 'GET',
    })
    return games
  }

  async getOne(id: number) {
    const game = await fetchApi<TGame>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      method: 'GET'
    })
    return game
  }

  async addPlayer(id: number, playerId: number) {
    const game = await fetchApi<TGame>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      method: 'PATCH',
      body: {
        playerId
      }
    })
    return playerId
  }

  async delete(id: number) {
    const game = await fetchApi<any>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      method: 'DELETE'
    })
    return game
  }

  async create(game: TGame) {
    const g = await fetchApi<TGame>({
      endpoint: this.BASE_ENDPOINT,
      method: 'POST',
      body: game,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return g
  }
}

export default GamesController