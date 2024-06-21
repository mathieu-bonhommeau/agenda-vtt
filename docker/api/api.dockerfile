FROM node:20-alpine

WORKDIR /app

COPY --link ./api/dist ./dist
COPY --link ./api/node_modules ./node_modules

EXPOSE 5000

CMD ["node", "--enable-source-maps", "dist/main.js"]
