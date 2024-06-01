FROM node:16
WORKDIR /app  
COPY package.json /app  
RUN npm install  
# coppy all code, lib -> app
COPY . /app  
EXPOSE 5000 
CMD node index.js