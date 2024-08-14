FROM node:20-alpine

WORKDIR /todolist

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve
# Set the command to run the server
CMD ["serve", "-s", "build"]

# Expose port 3000
EXPOSE 3000
