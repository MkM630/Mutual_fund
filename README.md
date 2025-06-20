# Mutual Fund Tracker

This is a full-stack application designed to help users track mutual funds. It features a React-based frontend and a Node.js/Express backend with MongoDB for data storage.

## Features

- User authentication (signup, login)
- View a list of mutual funds
- Save and track favorite mutual funds
- Detailed view of individual mutual funds

## Technologies Used

### Frontend (Client)

- React.js
- Vite (for fast development and build)
- Tailwind CSS (for styling)
- React Router DOM (for navigation)
- Axios (for API requests)

### Backend (Server)

- Node.js
- Express.js (web framework)
- MongoDB (NoSQL database)
- Mongoose (ODM for MongoDB)
- JSON Web Tokens (JWT) for authentication
- Bcrypt (for password hashing)
- CORS (for cross-origin resource sharing)

## Setup Instructions

To get this project up and running on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone <repository_url>
cd mmfund
```

### 2. Environment Variables

Create a `.env` file in the root directory of the project (`mmfund/`) and add the following environment variables:

```
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="a_strong_secret_key_for_jwt"
PORT=5000
NODE_ENV=development
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection URI (e.g., from MongoDB Atlas) and `a_strong_secret_key_for_jwt` with a secure, random string.

### 3. Install Dependencies

Navigate to the root directory and install dependencies for both the server and client:

```bash
# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

### 4. Build the Client (Frontend)

Before running the server, you need to build the client application. Navigate to the `client` directory and run the build command:

```bash
cd client
npm run build
cd ..
```

This will create a `dist` folder inside the `client` directory, which contains the optimized production build of your React application.

## Running the Application

### 1. Start the Backend Server

From the root directory of the project, run the development server:

```bash
npm run dev
```

The server should start on `http://localhost:5000`.

### 2. Start the Frontend Development Server

In a new terminal, navigate to the `client` directory and start the frontend development server:

```bash
cd client
npm run dev
```

The frontend application will typically be available at `http://localhost:5173`.

Now you can open your browser and navigate to `http://localhost:5173` to access the application.