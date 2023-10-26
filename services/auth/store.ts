import { type LoginModel, getLogin_DEFAULT } from '../auth'
import { useLocalStorage, useStorage } from '@vueuse/core'

export const _loginStore = useStorage<LoginModel>('login', getLogin_DEFAULT())