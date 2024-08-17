# 🌟 MERN Authentication Project

Welcome to the MERN Authentication Project! This repository contains a full-stack authentication system built with the MERN (MongoDB, Express, React, Node.js) stack.

## 🚀 Features
- 🔐 **User Authentication:** Secure login and registration.
- 🔏 **Password Encryption:** Passwords are securely hashed using bcrypt.
- 📜 **JWT Authentication:** JSON Web Tokens (JWT) for session management.
- 🌐 **React Frontend:** Clean and responsive user interface.
- 🛠️ **Express Backend:** Robust RESTful API.
- 💾 **MongoDB Database:** Efficient data storage and retrieval.
- 🌍 **Cross-Origin Resource Sharing (CORS):** Allows secure API access across different origins.
- 🛡️ **Error Handling:** Graceful error handling across the stack.

## 🛠️ Installation

Follow these steps to get a local copy up and running:

1. **Clone the repo:**

    ```bash
    git clone https://github.com/diaabashtawi/MERN-Auth-Project.git
    ```

2. **Install dependencies:**

    - For the server:

        ```bash
        cd backend
        npm install
        ```

    - For the client:

        ```bash
        cd frontend
        npm install
        ```

3. **Environment variables:**

    Create a `.env` file in the `backend` directory and configure the following:

    ```bash
    MONGO_URI=your_mongo_db_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application:**

    - Start the backend server:

        ```bash
        cd backend
        npm run dev
        ```

    - Start the frontend:

        ```bash
        cd frontend
        npm start
        ```

    The application will be running on `http://localhost:3000`.

## 🧩 Project Structure

- **backend/**: Contains the Express server and API routes.
- **frontend/**: Contains the React application and frontend assets.


## 👥 Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome! 🙌

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## 💬 Contact

- **GitHub:** [diaabashtawi](https://github.com/diaabashtawi)
- **Email:** your.email@example.com
