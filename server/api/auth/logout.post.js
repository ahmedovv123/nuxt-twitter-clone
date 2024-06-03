import {removeRefreshToken} from "~/server/db/refreshTokens.js";
import {sendRefreshToken} from "~/server/utils/jwt.js";
import {sendError} from "h3";

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event)
    const refreshToken = cookies.refresh_token
    await removeRefreshToken(refreshToken)
  } catch (e) {
    sendError(event, createError({statusCode: 500, statusMessage: 'Something went wrong'}))
  }

  sendRefreshToken(event, null)

  return {
    message: 'Done'
  }
})