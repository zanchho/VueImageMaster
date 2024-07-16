import axios from "axios"

let __instance
let __store
function createApiClient(storeInstance) {
  if (!__store && !storeInstance)
    throw new Error(
      "apiClient needs access to tokens StoreInstance at least once"
    )
  if (!__store) __store = storeInstance
  if (!storeInstance) storeInstance = __store
  if (!__instance) {
    __instance = axios.create({
      baseURL: "http://127.0.0.1:3000",
    })

    __instance.interceptors.request.use(config => {
      const token = storeInstance?.state?.token || null
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  return __instance
}

export { createApiClient }
