import { fetchApi } from "../../api/fetchApi";
import { Zone } from "../../types/Zone";

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
}

export default ZonesController