import { axiosInstance , AxiosResponse} from "@/services/axios";
import { UserModel } from '.'

export async function userList_API(payload = {}): Promise<[UserModel[], null] | [null, Error]> {
  try {
    const response = <AxiosResponse<UserModel[]>>(
      await axiosInstance.get('/auth/v1/admins/user', {
        params: {
            page: 0,
            size: 10,
            verified: false
        }
      })
    )

    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}
export async function updateUserVerify_API(id): Promise<[any, null] | [null, Error]> {
  try {
    const response = <any>(
      await axiosInstance.put('/auth/v1/admins/user/verify/' + id)
    )

    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}
export async function UserBlock_API(id): Promise<[any, null] | [null, Error]> {
  try {
    const response = <any>(
      await axiosInstance.put('/auth/v1/admins/user/block/' + id)
    )

    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}

// export async function register_API(formData): Promise<[UserModel, null] | [null, Error]> {
//   try {
//     const response = <any>(
//       await axiosInstance.post('/auth/v1/public/signUp', formData)
//     )

//     return [response.data, null]
//   } catch (error) {
//     return [null, error as Error]
//   }
// }