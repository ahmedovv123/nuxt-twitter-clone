import {sendError} from 'h3'
import {createUser} from "~/server/db/users.js";
import {userTransformer} from "~/server/transformers/user.js";

export default defineEventHandler(async (event) => {
  const {username, email, password, repeatPassword, name} = await readBody(event)

  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(event, createError({statusCode: 400, statusMessage: 'Invalid params'}))
  }

  if (password !== repeatPassword) {
    return sendError(event, createError({statusCode: 400, statusMessage: 'Password do not match'}))

  }

  const userData = {
    username,
    password,
    email,
    name,
    profileImage: 'https://picsum.photos/200/200'
  }
  const user = await createUser(userData)

  return userTransformer(user)
})