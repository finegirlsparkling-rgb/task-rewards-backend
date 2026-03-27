# Task Rewards Backend

## Project Overview

This project serves as a backend for managing task rewards. It allows users to create, view, and manage rewards associated with various tasks and events. 

## Features
- Create and manage tasks.
- Assign rewards to tasks.
- Retrieve lists of tasks and their associated rewards.
- User authentication and authorization.

## Installation Instructions

To set up the project locally, follow these steps:

1. **Clone the repository:**  
   ```bash  
   git clone https://github.com/finegirlsparkling-rgb/task-rewards-backend.git  
   cd task-rewards-backend  
   ```  

2. **Install dependencies:**  
   Using npm:  
   ```bash  
   npm install  
   ```  

3. **Set up environment variables:**  
   Create a `.env` file in the root directory and define the required environment variables:
   ```plaintext
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. **Run the application:**  
   ```bash  
   npm start  
   ```

The backend server will start running on `http://localhost:3000`.  

## API Endpoint Documentation

### Base URL
`http://localhost:3000/api`

### Authentication
- **POST /auth/login**: Logs user in, returns JWT token.
- **POST /auth/register**: Registers a new user, returns JWT token.

### Tasks
- **GET /tasks**: Retrieves a list of all tasks.  
- **GET /tasks/:id**: Retrieves the task with the specified ID.  
- **POST /tasks**: Creates a new task. Requires authentication.  
- **PUT /tasks/:id**: Updates the task with the specified ID. Requires authentication.  
- **DELETE /tasks/:id**: Deletes the task with the specified ID. Requires authentication.

### Rewards
- **GET /rewards**: Retrieves a list of all rewards.  
- **GET /rewards/:id**: Retrieves the reward with the specified ID.  
- **POST /rewards**: Creates a new reward. Requires authentication.  
- **PUT /rewards/:id**: Updates the reward with the specified ID. Requires authentication.  
- **DELETE /rewards/:id**: Deletes the reward with the specified ID. Requires authentication.