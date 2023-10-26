import { type LoginModel  } from './model'

export function getLogin_DEFAULT(): LoginModel {
  const object: LoginModel = {
  token: '',
  iat: 0,
  role: [],
   sub: '',
  }

  return object
}