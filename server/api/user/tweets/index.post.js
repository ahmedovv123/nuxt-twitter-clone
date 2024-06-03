import formidable from 'formidable'
import {createTweet} from "~/server/db/tweets.js";
import {tweetTransformer} from "~/server/transformers/tweet.js";
import {createMediaFile} from "~/server/db/mediaFiles.js";
import {uploadToCloudinary} from "~/server/utils/cloudinary.js";

export default defineEventHandler(async (event) => {
  const form = formidable({})
  let fields
  let files


  try {
    [fields, files] = await form.parse(event.req)
  } catch (error) {
    sendError(event, createError({statusCode: 400, statusMessage: 'Invalid params'}))
  }

  const userId = event.context?.auth.user.id



  const tweetData = {
    text: fields.text[0],
    authorId: userId,
  }
  const replyTo = fields.replyTo[0]

  if (replyTo && replyTo !== 'null' && replyTo !== 'undefined') {
    tweetData.replyToId = replyTo
  }

  const tweet = await createTweet(tweetData)


  if (Object.keys(files).length) {

    const filePromises = files.image.map(async img => {
      const cloudinaryResource = await uploadToCloudinary(img.filepath)

      return createMediaFile({
        url: cloudinaryResource.secure_url,
        providerPublicId: cloudinaryResource.public_id,
        userId,
        tweetId: tweet.id
      })
    })

    await Promise.all(filePromises)
  }


  return {
    tweet: tweetTransformer(tweet)
  }
})