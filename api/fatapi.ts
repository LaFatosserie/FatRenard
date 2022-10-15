import { TGame } from "types/Game";
import { TUser } from "types/User";
import { TZone } from "types/Zone";
import { fetchApi } from "./fetchApi";

/**
 * API class for all the transactions with the API
 */
class API {
  public users: UsersController;
  public zones: ZonesController;
  public games: GamesController;

  constructor() {
    this.users = new UsersController();
    this.zones = new ZonesController();
    this.games = new GamesController();
  }
}

export default API

/**
 * USERS
 */
class UsersController {
  private BASE_ENDPOINT = '/users';

  async getAll() {
    const people = await fetchApi<TUser[]>({
      endpoint: this.BASE_ENDPOINT,
      method: 'GET',
    })
    return people
  }

  async getOne(id: number) {
    const person = await fetchApi<TUser>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      method: 'GET'
    })
    return person
  }

  async delete(id: number) {
    const person = await fetchApi<any>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      method: 'DELETE'
    })
    return person
  }

  async create(person: TUser) {
    const p = await fetchApi<TUser>({
      endpoint: this.BASE_ENDPOINT,
      method: 'POST',
      body: person,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return p
  }
}

/**
 * ZONES
 */
class ZonesController {
  private BASE_ENDPOINT = '/zones';

  async getAll() {
    const zones = await fetchApi<TZone[]>({
      endpoint: this.BASE_ENDPOINT,
      method: 'GET',
    })
    return zones
  }

  async getOne(id: number) {
    const zone = await fetchApi<TZone>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      method: 'GET'
    })
    return zone
  }

  async delete(id: number) {
    const zone = await fetchApi<any>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      method: 'DELETE'
    })
    return zone
  }

  async create(zone: TZone) {
    const z = await fetchApi<TZone>({
      endpoint: this.BASE_ENDPOINT,
      method: 'POST',
      body: zone,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return z
  }
}

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