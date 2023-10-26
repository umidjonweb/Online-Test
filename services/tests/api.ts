import { axiosInstance , AxiosResponse} from "@/services/axios";

export async function postQuestionCreate_API(payload): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.post('/trials/v1/questions', payload)
    )
    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}   
export async function getQuestionLists_API(): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.get('/trials/v1/questions', {
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
export async function getTestLists_API(): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.get('/trials/v1/tests', {
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

export async function postTestCreate_API(payload): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.post('/trials/v1/tests', payload)
    )
    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}   
export async function startTest_API(payload): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.post('/trials/v1/process/start', {
        userId:"5c7472e0-2985-42d3-b596-62ef87add763",
        testId:payload
      })
    )
    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}   
export async function processTest_API(id): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.get('/trials/v1/process/'+id)
    )
    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}   
export async function sertificatDownload_API(url): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.get('/files/v1/download?file='+url)
    )
    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}   

export async function putSelectTest_API(data): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await 
      axiosInstance.put(`/trials/v1/process/select/${data.id}?questionId=${data.questionId}&formId=${data.formId}`, 
     
      )
    )
    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }
}   
export async function getMyTest_API(): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.get('/trials/v1/process/my-tests', {
        params:{
          size: 70,
          page: 0
      }})
    )
    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }}
  export async function finishMyTest_API(id): Promise<[any, null] | [null, Error]> {
  try {
    const response = <AxiosResponse<any>>(
      await axiosInstance.post('/trials/v1/process/finish/'+ id)
    )
    return [response.data, null]
  } catch (error) {
    return [null, error as Error]
  }}