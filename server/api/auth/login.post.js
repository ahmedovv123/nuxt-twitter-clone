import {sendError} from "h3";
import {getUserByUsername} from "~/server/db/users.js";
import bcrypt from "bcrypt";
import {generateTokens, sendRefreshToken} from "~/server/utils/jwt.js";
import {userTransformer} from "~/server/transformers/user.js";
import {createRefreshToken} from "~/server/db/refreshTokens.js";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  if (!username || !password) {
    return sendError(event, createError({statusCode: 400, statusMessage: 'Invalid params'}))
  }

  // If the user registered
  const user = await getUserByUsername(username)

  if (!user)
    return sendError(event, createError({statusCode: 400, statusMessage: 'Username or password is invalid'}))

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch)
    return sendError(event, createError({statusCode: 400, statusMessage: 'Username or password is invalid'}))

  // Generate tokens
  // Access token
  // Refresh token

  const {accessToken, refreshToken} = generateTokens(user)

  // Save it inside db

  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  // Add http only cookie

  console.log(event)
  sendRefreshToken(event, refreshToken)

  return {
    access_token: accessToken,
    user: userTransformer(user)
  }
})