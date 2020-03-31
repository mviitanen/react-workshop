// Database API served by `json-server`
const baseURL = 'http://localhost:3333'

export async function get(path: string) {
  const res = await fetch(`${baseURL}${path}`)
  return await res.json()
}

export function getRaw(path: string) {
  return fetch(`${baseURL}${path}`)
}

export async function post(path: string, data: any) {
  const res = await fetch(`${baseURL}${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}
