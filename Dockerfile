FROM node:12-alpine AS build

WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client ./
RUN npm run build


FROM node:12-alpine

WORKDIR /app

COPY server ./
RUN npm install

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]
