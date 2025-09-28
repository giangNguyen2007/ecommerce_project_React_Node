
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN apk add --no-cache openssl
RUN npx prisma generate

EXPOSE 4000

#from pwd
CMD ["npm", "start"]