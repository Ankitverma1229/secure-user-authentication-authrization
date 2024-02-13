# Secure User Authentication and Authorization System with Express.js

Welcome to the Secure User Authentication and Authorization System! This project aims to create a secure user authentication and authorization system using Express.js, a Node.js web application framework. The system will provide functionalities for user registration, authentication, secure routes, user roles, password reset, security measures, logging, and testing.

## Overview

The Secure User Authentication and Authorization System utilizes Express.js as the backend framework and MongoDB as the non-relational database, with Mongoose as the ORM (Object-Relational Mapping) tool.

## Core Functionalities

### 📝 User Registration and Authentication

- Users can register with email, password, and an optional role field, providing necessary details securely.
- Passwords are securely hashed using bcrypt to protect user credentials.
- Token-based authentication using JWT (JSON Web Tokens) ensures secure user login.
- The role field is optional and can be included during registration. If not provided, the role will default to "user".


### 🔒 Secure Routes and Authorization

- Certain routes are protected and require a valid JWT token for access, ensuring secure data transmission.
- Middleware for JWT validation secures these routes and ensures authorized access.
- Role-based access control system implemented with roles like "user" and "admin."
- Access to certain routes restricted based on the user's role, with additional permissions for admins.


### 🔑 Password Reset

- Forgot Password feature allows users to securely reset their passwords through an email-based process.
  - Users can send a request to reset their password by providing their email address.
  - The system sends an email to the user's respective email address with a unique link.
  - Users can click on the link provided in the email to reset their password.
- To test the password reset functionality, you can use the Postman, as the frontend is not implemented yet.
  - Send a POST request to the appropriate endpoint with the user's email address.
  - Click on the link provided in the email to access the password reset page.
  - Use Postman to send a PUT request with the new password to complete the password reset process.

## Routes

### Authentication Routes (`/api/auth`)

- **POST /register:** Register a new user with email and password.
- **POST /login:** Authenticate user and generate JWT token for access.
- **POST /forgot-password:** Send a password reset email to the user's email address.
- **PUT /reset-password/:user_id:** Reset user's password using the reset token received via email.

### User Routes (`/api/user`)

- **GET /profile/:user_id:** Retrieve user profile information.
- **POST /create-quiz:** Create a new quiz. (Accessible only to admin)
- **GET /get-quiz/:id:** Retrieve quizzes. (Accessible to both admin and user)

## Getting Started

To set up Secure User Authentication and Authorization System locally, follow these steps:

1. Install dependencies:

```
npm install
```

2. Add .env file with your details

```
PORT = 5000
DATABASE_URL = mongodb+srv:*****
JWT_SECRET = "******"
SMTP_HOST = ******
SMTP_PORT = ***
SMTP_MAIL = ******
SMTP_PASSWORD = ********

```

3. Start the application for backend:

   ```
    npm run dev || nodemon server.js

   ```

## Technology Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB
- **ORM Tool:** Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt for password hashing, Helmet for HTTP headers protection

## Contact

For inquiries and support, please reach out to [ankitkumar040722@gmail.com](mailto:ankitkumar040722@gmail.com).
