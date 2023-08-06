# Use image nodejs
FROM node:18.16.0 as build-stage

# Set workplace 
WORKDIR /app 

#Copy package.json and package-lock.json into workplace
COPY ./client/package*.json ./

# Install dependencies 
RUN npm install 

# Copy all of files in client folder into workplace
COPY ./client/src .
COPY ./client/public .

# Build React application 
RUN npm run build 

# Use Nginx for production 
FROM nginx:1.21 

# Copy all of build from build-stage into Nginx folder
COPY --from=build-stage /app/build/ /usr/share/nginx/html

#Expose default gate of Nginx 
EXPOSE 80 

# Run Ngnix 
CMD ["nginx", "-g", "daemon off;"]