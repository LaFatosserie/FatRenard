/**
 * Fetch FatWrapper
 */

/**
 * TYPES
 */
type TFetchProps = {
  endpoint: string,
  queryParams?: any,
  body?: any,
  headers?: any,
  method?: 'POST' | 'GET' | 'PATCH' | 'DELETE'
}

type TFetchResponse<T> = {
  data: T,
  status: number,
  statusText?: string,
  error?: string,
  ok: boolean
}

/**
 * Get all the params in object and add them as a string
 * 
 * @param params query Params
 * @returns a string
 */
export function encodeQueryParams(params: any): string {
  const res = []
  for (let d in params) res.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]))
  if (res.length === 0) return ''
  return '?' + res.join('&')
}

export async function fetchApi<T>({
  endpoint,
  method,
  queryParams,
  body,
  headers
}: TFetchProps) {
  try {
    console.debug('URL', process.env.NEXT_PUBLIC_FATAPI_URL + endpoint)
    const fattoken = await localStorage.getItem('__fat_token__')
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FATAPI_URL}${endpoint}${encodeQueryParams(queryParams)}`,
      {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: fattoken ? Object.assign({ 'Authorization': `Bearer ${fattoken}` }, headers) : headers
      }
    )
    const data = await res.json()
    if (!res.ok) {
      console.error('Error while fetching', res.ok, data.error, data.message)
      return {
        ok: res.ok,
        status: res.status,
        data: {} as T,
        error: `${data.error ? data.error : ''} - ${data.message}`
      } as TFetchResponse<T>
    }
    console.log('[FETCH API] - Successful request', data)
    return {
      data,
      ok: true,
      status: res.status,
      statusText: res.statusText
    } as TFetchResponse<T>
  } catch (e) {
    if (e instanceof Error) {
      console.error('ERROR FETCH - ', e.message, e.cause, e.name)
      return {
        ok: false,
        status: 500,
        data: {} as T,
        error: e.name + e.message
      } as TFetchResponse<T>
    }
  }
  return {
    ok: false,
    status: 500,
    data: {} as T,
    error: 'Server Failure'
  } as TFetchResponse<T>
}
