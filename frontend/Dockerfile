FROM node:18-alpine
WORKDIR /code

COPY package.json package-lock.json /code/
RUN npm install 
RUN npm install react-scripts@5.0.1 -g 
COPY . /code/
RUN chown -R node:node /app/node_modules
EXPOSE 3000