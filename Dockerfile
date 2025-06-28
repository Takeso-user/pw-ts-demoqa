
# Use the official Node.js 20 image.
FROM node:20

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Install Playwright browsers and their dependencies.
RUN npx playwright install --with-deps

# Copy the rest of the application's source code.
COPY . .

# Expose any ports if necessary (though for a test framework, this is less common)
# EXPOSE 3000 

# The command to run the tests.
CMD ["npm", "run", "test:allure"]
