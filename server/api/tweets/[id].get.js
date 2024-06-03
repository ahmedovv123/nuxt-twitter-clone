import {getTweetById} from "~/server/db/tweets.js";
import {tweetTransformer} from "~/server/transformers/tweet.js";

export default defineEventHandler(async event => {

  const {id} = event.context.params
  const tweet = await getTweetById(id, {
    include: {
      author: true,
      mediaFiles: true,
      replyTo: {
        include: {
          author: true,
        }
      },
      replies: {
        include: {
          mediaFiles: true,
          author: true,
          replyTo: {
            include: {
              author: true
            }
          }
        },
        orderBy: [
          {
            createdAt: 'desc'
          }
        ]
      }
    }
  })

  return {
    tweet: tweetTransformer(tweet)
  }
})