/**
 * Fetch FatWrapper
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
    const res = await fetch(
      `${process.env.NEXT_PUBKIC_FATAPI_URL}${endpoint}${encodeQueryParams(queryParams)}`,
      {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers
      }
    )
    const data = await res.json()
    return {
      data,
      ok: true,
      status: res.status,
      statusText: res.statusText
    } as TFetchResponse<T>
  } catch (e) {
    if (e instanceof Error) {
      return {
        ok: false,
        status: 500,
        data: {} as T,
        error: e.name + e.message
      } as TFetchResponse<T>
    }
  }
}
