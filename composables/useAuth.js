import useFetchApi from "~/composables/useFetchApi.js";
import {jwtDecode} from "jwt-decode";

export default () => {

  const useAuthToken = () => useState('auth_token')
  const useAuthUser = () => useState('auth_user')
  const useAuthLoading = () => useState('auth_loading', () => true)

  const setToken = (newToken) => {
    const authToken = useAuthToken()

    authToken.value = newToken
  }

  const setUser = (newUser) => {
    const authUser = useAuthUser()

    authUser.value = newUser
  }

  const setIsAuthLoading = (value) => {
    const authLoading = useAuthLoading()

    authLoading.value = value
  }
  const login = ({username, password}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password
          }
        })

        setToken(data.access_token)
        setUser(data.user)

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh')

        setToken(data.access_token)

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user')

        setUser(data.user)

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()

    if (!authToken.value)
      return

    const jwt = jwtDecode(authToken.value)

    const now = Math.floor(Date.now() / 1000)
    const newRefreshTime = (jwt.exp - now) - 60

    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime * 1000)

  }
  const initAuth = () => {
    setIsAuthLoading(true)
    return new Promise(async (resolve, reject) => {
      try {
        await refreshToken()
        await getUser()

        reRefreshAccessToken()

        resolve(true)
      } catch (error) {
        reject(error)
      } finally {
        setIsAuthLoading(false)
      }
    })
  }

  const logout = async () => {
    return useFetchApi('/api/auth/logout', {
      method: 'POST'
    })
    .then(() => {
      setToken(null)
      setUser(null)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return {
    login,
    useAuthUser,
    useAuthToken,
    useAuthLoading,
    initAuth,
    logout
  }
}