# Ecommerce-Follow-Along

## 📜 Project Description  
This project is a full-fledged E-Commerce Application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It is designed to provide hands-on experience with real-world development concepts and tools, focusing on creating a scalable and feature-rich online shopping platform.

---

## 🌟 Key Features  
- Built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).  
- REST API creation for scalable backend services.  
- User authentication for secure login and registration.  
- Database schema design using MongoDB.  
- Robust backend development with Node.js and Express.  

---

## 🚀 Milestone 1: Project Overview  

### **Introduction to MERN Stack:**  
- Overview of MongoDB, Express.js, React.js, and Node.js.  
- Understanding the benefits of using a JavaScript-only approach for full-stack development.  

### **REST API Structure and Endpoints:**  
- Introduction to RESTful architecture.  
- Planning API endpoints for user authentication, product management, and order handling.  

### **Database Schema Design Basics:**  
- Introduction to MongoDB schema design.  
- Understanding the structure and relationships of data in the e-commerce context.  

### **Role of Authentication:**  
- Importance of user authentication in web applications.  
- Overview of implementing secure login and registration functionalities.  

### **Project Vision and Goals:**  
- Detailed explanation of the e-commerce application's overall vision.  
- Discussion of key features to be implemented in upcoming milestones.  

### **Live Demonstration:**  
- Observation of the completed application's functionality.  
- Overview of user interface and backend integration.  

---

## 🚀 Milestone 2: Project Setup and Login Page  

### **Project Folder Structure:**  
- Organized project files into separate frontend and backend directories for better maintainability.  

### **React Frontend Setup:**  
- Initialized a React application for building the user interface.  

### **Node.js Backend Setup:**  
- Set up a simple Node.js server to prepare for API integration in future milestones.  

### **Tailwind CSS Configuration:**  
- Integrated and configured Tailwind CSS for modern, responsive, and utility-based styling.  

### **Login Page Development:**  
- Designed and implemented the first user interface of the application, focusing on functionality and styling.  
- The login page includes a responsive layout with Tailwind CSS and essential input fields for email and password.  

### **GitHub Repository Updates:**  
The repository includes:  
- Separate folders for frontend and backend.  
- The functional Login Page in the frontend directory.  

---

Here’s a README update for **Milestone 3: Project Setup for Backend**:

---

# **Milestone 3: Project Setup for Backend** 🚀

With Milestone 3 complete, we have successfully set up the backend for our e-commerce application, integrating a server, database connection, and basic error handling. This milestone builds the foundation for handling API requests and managing data efficiently.

---

## **What Was Achieved in This Milestone** 🎯

### 1. **Backend Folder Structure**
We established a clear and organized folder structure for the backend code, making it easier to manage and scale as the project grows:
```
project-root/
├── backend/
│   ├── routes/         # Defines API routes
│   ├── controllers/    # Contains route handling logic
│   ├── models/         # Defines MongoDB schemas using Mongoose
│   ├── middlewares/    # Includes middleware for error handling
│   ├── config/         # Stores database configuration
│   ├── utils/          # (Optional) Helper functions
│   └── server.js       # Main server file
└── frontend/           # Frontend-related code
```

---

### 2. **Server Setup**
We configured a Node.js server using **Express** to handle incoming API requests. The server listens on a designated port and includes:
- Middleware for parsing JSON requests.
- A root route (`GET /`) to confirm that the server is running.

Example:
```javascript
app.get('/', (req, res) => {
    res.send('Server is running!');
});
```

---

### 3. **Database Integration**
The backend was successfully connected to **MongoDB** using the **Mongoose** library:
- A `.env` file was added to store sensitive data like the `MONGO_URI`.
- MongoDB connection established with proper error handling.

Example:
```javascript
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection failed:', err));
```

---

### 4. **Error Handling**
We implemented basic error-handling middleware to provide clear error messages and ensure smoother debugging. For unsupported routes, we added a 404 handler.

Example:
```javascript
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});
```

---

## **Key Commands Used** 🛠️

1. **Initialize the Backend Folder:**
   ```bash
   mkdir backend
   cd backend
   npm init -y
   npm install express mongoose dotenv
   ```

2. **Run the Server:**
   ```bash
   node server.js
   ```

3. **Test the API:**
   - Use tools like Postman or `curl` to test endpoints.
   - Example: `GET http://localhost:5000/`

---

## **Next Steps**
In the next milestone, we will:
- Develop additional API routes for product and user management.
- Implement more advanced middleware for authentication and validation.
- Begin integrating the frontend with the backend.

---

Here’s an updated README section tailored for **Milestone 4: Creating User Model and Controller**:

---

# **Milestone 4: Creating User Model and Controller** 🌟

In this milestone, we built on the foundation laid in Milestone 3 by creating a **User Model** for MongoDB, implementing a **User Controller** to handle user-related actions, and integrating **Multer** to enable file uploads (e.g., profile pictures).

---

## **What Was Achieved in This Milestone** 🎯

### 1. **User Model**
We created a `User` model to define the structure of user-related data stored in the MongoDB database. The model includes fields for:
- **name** (string, required)
- **email** (string, required, unique)
- **password** (string, required)
- **profilePicture** (string, optional)

The schema was created using Mongoose.

Example:
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
});

module.exports = mongoose.model('User', userSchema);
```

---

### 2. **User Controller**
We implemented a `UserController` to manage user-related operations, including:
- **Create User:** Handles the addition of new users to the database.
- **Get User by ID:** Retrieves user details using the user ID.
- **Update User:** Updates user details, including their profile picture.

Example snippet for creating a new user:
```javascript
const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
```

---

### 3. **File Uploads with Multer**
We integrated **Multer** to enable users to upload files, such as profile pictures. Uploaded files are stored in a designated folder on the server.

- Multer configuration:
```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });
module.exports = upload;
```

- Example route for uploading a profile picture:
```javascript
const upload = require('../middlewares/multer');
const UserController = require('../controllers/UserController');

router.post('/upload-profile', upload.single('profilePicture'), UserController.uploadProfilePicture);
```

---

### 4. **Updated Folder Structure**
The backend folder structure now includes:
```
backend/
├── routes/
│   └── userRoutes.js    # Defines user-related API routes
├── controllers/
│   └── UserController.js # Handles user logic
├── models/
│   └── User.js          # Defines User schema
├── middlewares/
│   └── multer.js        # Multer configuration
├── uploads/             # Stores uploaded files
└── server.js            # Main server file
```

---

## **Key Commands Used** 🛠️

1. **Install Multer and Mongoose:**
   ```bash
   npm install multer mongoose
   ```

2. **Run the Server:**
   ```bash
   node server.js
   ```

---

## **How to Test**
1. **Create a User:**
   - Use Postman or `curl` to send a POST request to `/api/users` with user data (e.g., name, email, password).
   
2. **Upload Profile Picture:**
   - Send a POST request to `/api/users/upload-profile` with a file attached as `profilePicture`.

---

## **Next Steps**
In the next milestone, we’ll:
- Add authentication to secure user-related routes.
- Explore advanced features like JWT-based login and role-based access control.

---
