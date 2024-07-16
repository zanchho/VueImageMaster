import { createStore, Store } from "vuex"

import { createApiClient } from "@/utils/apiClient"

const store = createStore({
  state: {
    token: null,
    user: null,
    isAuthenticated: false,
    imageToEdit: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, user) {
      state.user = user
    },
  },
  actions: {
    login: async ({ commit }, encryptedCredentials) => {
      const apiClient = createApiClient(store)
      try {
        const response = await apiClient.post("/login", {
          encryptedCredentials,
        })
        const { token, user } = response.data
        console.log(token, user)
        commit("SET_TOKEN", token)
        commit("SET_USER", user)
        localStorage.setItem("authToken", token) // should go out before prod
      } catch (error) {
        console.error("Vuex-action:login failed:", error)
        throw error // Propagate the error to the caller
      }
    },
    logout: async ({ commit }) => {
      commit("SET_TOKEN", null)
      commit("SET_USER", null)

      //TODO
      //   redirect to login page
    },
  },
})

export default store
