# TaskManager Application

TaskManager is a full-stack web application designed to help to manage tasks efficiently. With a focus on simplicity and usability, TaskManager allows users to create, view, edit, and delete tasks, incorporating user authentication to ensure that users can securely manage their personal task lists.

## Getting Started

Follow these instructions to get a copy of TaskManager running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- MongoDB
- npm

### Database Configuration
This application's data persistence is managed through MongoDB Atlas, a cloud database service for scalability, security, and performance optimization features.

### Installing

Clone the repository to your local machine:

```bash
git clone https://github.com/omarelf/TaskManager.git
cd TaskManager

cd backend
npm install

cd frontend
npm start

### Setting Up Environment Variables

# MongoDB URI for connecting to your database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-address>/<dbname>

# Secret key for JWT authentication
JWT_SECRET=<your_jwt_secret>

# The port number your app will listen on
PORT=5000

### Running the Tests

Unit Tests
Run unit tests using:

npm test

End-to-End Tests
Ensure the application is running, and then execute end-to-end tests with:

npm run e2e






