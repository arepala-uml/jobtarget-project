FROM node:16-alpine as build

WORKDIR /app

COPY ui/package.json ui/package-lock.json ./

RUN npm install

COPY ui/ /app/

RUN npm run build

FROM nginx:alpine

# Copy the React app build files from the build stage (from /app/build) to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
