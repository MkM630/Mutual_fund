# Mutual Fund Tracker

This is a full-stack application designed to help users track mutual funds. It features a React-based frontend and a Node.js/Express backend with MongoDB for data storage.

## Features

- User authentication (signup, login)
- View a list of mutual funds
- Save and track favorite mutual funds
- Detailed view of individual mutual funds

## Screenshots :

### Home page
<img width="954" alt="image" src="https://github.com/user-attachments/assets/c7c63d57-6b1e-4f55-9d01-64e6c70d224e" />
### Login and register page :
<img width="958" alt="image" src="https://github.com/user-attachments/assets/93d73d49-896e-44e3-84bf-64683143c1dd" />

### Seach result
<img width="941" alt="image" src="https://github.com/user-attachments/assets/94f00719-a7dd-4dd3-936d-e49c5fe80bbb" />
<img width="944" alt="image" src="https://github.com/user-attachments/assets/fcbfdb9e-20fc-4c81-a664-ecb89ab8ce04" />

### Save Funds
<img width="946" alt="image" src="https://github.com/user-attachments/assets/1781fa3b-13a8-4f68-b11b-42fa076f118c" />

### Database:
<img width="947" alt="image" src="https://github.com/user-attachments/assets/cdf56914-d4ad-4de5-bd4f-1d38efb8dbe0" />




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
