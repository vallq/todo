FROM mhart/alpine-node:8.11.4

# Set the working directory to /todo-react
WORKDIR /todo-react

#copy package.json into the container at /todo-react
COPY package*.json /todo-react/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /todo-react
COPY . /todo-react

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]


