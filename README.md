# Task Management server

## Short Description
This is the server-side implementation of the task management application. It handles API requests to manage tasks such as creating, fetching, updating, and deleting tasks.

## Live Links
- https://task-management-server-seven-wine.vercel.app/

- **API Endpoints**: 
  - `GET /tasks` – Fetch all tasks
  - `POST /tasks` – Add a new task
  - `DELETE /tasks/:id` – Delete a task by ID
  - `PUT /tasks/:id` – Update a task by ID

## Dependencies

- **Express**: Fast, unopinionated web framework for Node.js
- **MongoDB**: A NoSQL database to store tasks
- **Mongoose**: ODM for MongoDB, used to interact with the database
- **Cors**: Package to enable Cross-Origin Resource Sharing
- **Dotenv**: Loads environment variables from a `.env` file
- **Body-parser**: Middleware to parse request bodies

## Technologies Used
- Node.js: JavaScript runtime for server-side programming
- Express: Web framework to build the API
- MongoDB: Database for storing tasks
- Cors: Middleware for handling cross-origin requests
- Dotenv: For managing environment variables
