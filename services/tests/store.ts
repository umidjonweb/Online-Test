import { useStorage } from '@vueuse/core'
export const _testItems = useStorage('my-test', [])
export const _startTestId= useStorage('test-id', 0)
