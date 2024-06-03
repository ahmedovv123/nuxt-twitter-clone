export default () => {

  const usePostTweetModal = () => useState('post_tweet_modal', () => false)
  const useReplyTweet = () => useState('reply_tweet', () => null)

  const openPostTweetModal = (tweet = null) => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = true

    setReplyTo(tweet)
  }

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = false
  }

  const setReplyTo = (tweet) => {
    const replyTweet = useReplyTweet()
    replyTweet.value = tweet
  }
  const postTweet = (formData) => {
    const form = new FormData()

    form.append('text', formData.text)
    form.append('replyTo', formData.replyTo)

    formData.mediaFiles.forEach(file => {
      form.append('image', file)
    })

    return useFetchApi('api/user/tweets', {
      method: 'POST',
      body: form
    })
  }

  const getTweets = (params = {}) => {
    return useFetchApi('/api/tweets', {
      method: 'GET',
      params
    })
  }

  const getTweetById = (tweetId) => {
    return useFetchApi(`/api/tweets/${tweetId}`, {
      method: 'GET'
    })
  }

  return {
    postTweet,
    getTweets,
    getTweetById,
    usePostTweetModal,
    openPostTweetModal,
    closePostTweetModal,
    useReplyTweet
  }
}