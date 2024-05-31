import {prisma} from "~/server/db/index.js";

export const createRefreshToken = (refreshToken) => {
  return prisma.refreshToken.create({
    data: refreshToken
  })
}