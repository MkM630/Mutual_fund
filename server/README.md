# Mutual Fund Tracker API

## Overview
This is the backend API for the Mutual Fund Tracker application. It provides authentication, mutual fund search, and fund management functionality.

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation
1. Clone the repository
2. Navigate to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```
5. Start the server: `npm start`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  - Request body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: `{ "token": "string", "user": { "id": "string", "name": "string", "email": "string" } }`

- `POST /api/auth/login` - Login a user
  - Request body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "string", "user": { "id": "string", "name": "string", "email": "string" } }`

- `GET /api/auth/me` - Get current user profile
  - Headers: `{ "x-auth-token": "your_jwt_token" }`
  - Response: `{ "_id": "string", "name": "string", "email": "string" }`

### Mutual Funds
- `GET /api/funds/search?query=fundname` - Search for mutual funds
  - Response: `{ "data": [{ "schemeCode": "number", "schemeName": "string" }] }`

- `GET /api/funds/:id` - Get mutual fund details by ID
  - Response: Fund details object

- `POST /api/funds/save` - Save a mutual fund
  - Headers: `{ "x-auth-token": "your_jwt_token" }`
  - Request body: `{ "fundId": "string", "name": "string" }`
  - Response: Array of saved funds

- `GET /api/funds/saved/all` - Get all saved funds for current user
  - Headers: `{ "x-auth-token": "your_jwt_token" }`
  - Response: Array of saved funds

- `DELETE /api/funds/saved/:id` - Remove a saved fund
  - Headers: `{ "x-auth-token": "your_jwt_token" }`
  - Response: Updated array of saved funds

- `GET /api/funds/saved/check/:id` - Check if a fund is saved by current user
  - Headers: `{ "x-auth-token": "your_jwt_token" }`
  - Response: `{ "isSaved": boolean }`

## Data Models

### User
```javascript
{
  name: String,
  email: String,
  password: String,
  createdAt: Date
}
```

### SavedFund
```javascript
{
  user: ObjectId,
  fundId: String,
  name: String,
  createdAt: Date
}
```

## Error Handling
All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 404: Resource not found
- 500: Server error

## Authentication
This API uses JWT (JSON Web Token) for authentication. Include the JWT token in the `x-auth-token` header for protected routes.