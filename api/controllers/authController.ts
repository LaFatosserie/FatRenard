import { User } from "../../types/App";
import { fetchApi } from "../fetchApi";

class AuthController {
  async login(username: string, password: string) {
    const res = await fetchApi<{ token: string, username: string, userId: string }>({
      endpoint: '/auth/login',
      body: {
        username,
        password
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res;
  }

  async register(params: { username: string, firstname: string, lastname: string, email: string, password: string }) {
    const body = Object.assign({ admin: false }, params)
    const res = await fetchApi<{ token: string, user: User }>({
      endpoint: '/auth/register',
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res;
  }

  async me() {
    return fetchApi<User>({
      endpoint: '/me',
    })
  }
}

export default AuthController