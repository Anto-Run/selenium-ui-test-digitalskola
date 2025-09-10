FROM node:18-slim


WORKDIR /app

EXPOSE 3000

# Run using mounted code & dependencies
CMD ["sh", "-c", "npm install && npm start"]
