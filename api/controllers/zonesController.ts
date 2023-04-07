import { fetchApi } from "../../api/fetchApi";
import { TZone, Zone } from "../../types/Zone";

/**
 * ZONES
 */
class ZonesController {
  private BASE_ENDPOINT = '/zones';

  async getAll() {
    return fetchApi<Zone[]>({
      endpoint: this.BASE_ENDPOINT,
      method: 'GET',
    })
  }

  async getOne(id: string) {
    return fetchApi<Zone>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      method: 'GET'
    })
  }

  async create(zone: TZone) {
    return fetchApi<Zone>({
      endpoint: `${this.BASE_ENDPOINT}`,
      method: 'POST',
      body: zone,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default ZonesController