export default (url, options = {}) => {
  const {useAuthToken} = useAuth()
  const config = useRuntimeConfig()

  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`
    },
    baseURL: config.public.baseURL
  })
}