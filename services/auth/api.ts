import { axiosInstance , AxiosResponse} from "@/services/axios";
import { LoginModel} from '.'

export async function login_API(
  username: string,
  password: string
): Promise<[LoginModel, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<LoginModel>>(
      await axiosInstance.post('/auth/v1/public/signIn', { username, password })
    )

    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}
export async function register_API(formData): Promise<[LoginModel, null] | [null, Error]> {
  try {
    const response = <any>(
      await axiosInstance.post('/auth/v1/public/signUp', formData)
    )

    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}