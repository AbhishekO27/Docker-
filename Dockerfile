# Use official Node.js image
FROM node

# Set environment variables (no '=' sign)
ENV MONGO_DB_USERNAME admin
ENV MONGO_DB_PWD pass

# Set working directory
WORKDIR /home/app

# Copy all files to the container
COPY . .

# Install dependencies
RUN npm install

# Expose port (if needed)
EXPOSE 3000

# Start the app
CMD ["node", "intro.js"]
