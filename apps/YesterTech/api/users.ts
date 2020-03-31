import { post } from './utils'
import { UserNoId } from 'YesterTech/types'

export function registerUser(data: UserNoId) {
  return post(`/users`, data)
}
