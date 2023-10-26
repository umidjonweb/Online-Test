import { axiosInstance , AxiosResponse} from "@/services/axios";

export async function getSubjectLists_API(): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.get('/trials/v1/subjects', {
        params:{
          size: 10,
          page: 0
      }})
    )
    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}  

export async function postSubject_API(data): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.post('/trials/v1/subjects',data)
    )
    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}  