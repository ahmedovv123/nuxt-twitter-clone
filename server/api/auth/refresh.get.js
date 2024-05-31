import { sendError } from 'h3'
import {getRefreshTokenByToken} from "~/server/db/refreshTokens.js";
import {decodeRefreshToken, generateTokens} from "~/server/utils/jwt.js";
import {getUserById} from "~/server/db/users.js";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)

  const refreshToken = cookies.refresh_token

  if (!refreshToken) {
    return sendError(event, createError({statusCode: 401, statusMessage: 'Refresh token is invalid'}))
  }

  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!rToken) {
    return sendError(event, createError({statusCode: 401, statusMessage: 'Refresh token is invalid'}))
  }

  const token = decodeRefreshToken(rToken.token)

  try {
    const user = await getUserById(token.userId)

    const {accessToken} = generateTokens(user)

    return {
      access_token: accessToken
    }
  } catch (error) {
    return sendError(event, createError({statusCode: 500, statusMessage: 'Something went wrong'}))
  }
})