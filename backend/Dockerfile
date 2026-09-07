FROM node:20-alpine AS base

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 express

WORKDIR /app

COPY --chown=express:nodejs package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --chown=express:nodejs --from=build /app/dist ./src
COPY --chown=express:nodejs prisma ./prisma
COPY --chown=express:nodejs backend/ecosystem.config.js ./

RUN npx prisma generate

EXPOSE 4000
USER express

CMD ["node", "src/server.js"]
