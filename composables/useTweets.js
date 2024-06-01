export default () => {
  const postTweet = (formData) => {
    const form = new FormData()

    form.append('text', formData.text)

    formData.mediaFiles.forEach(file => {
      form.append('image', file)
    })

    return useFetchApi('api/user/tweets', {
      method: 'POST',
      body: form
    })
  }

  return {
    postTweet
  }
}