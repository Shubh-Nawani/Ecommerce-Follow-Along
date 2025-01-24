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

3. Database Schema Design
 MongoDB Data modeling
 It expresses the kind of data and how it is represented that exists in.
 
4. Authentication in Web Applications :
It verifies the user's identity for safe access.
This is required to allow purchases but also to protect the sensitive users' information.
 
### Live Demo
In this lecture, we gave a live demo of the e-commerce application in its fully working version, in the following points:
Functionality
User interface
Integration with the backend
- Install all the tools and dependencies to be used in the development environment.
Understand how a server communicates to its client with the help of an API.
Create a basic Node.js server using Express.
Milestone 2: Project Setup and Login Page
Achievements in this Milestone:
In Milestone 2, the foundation for the frontend and backend of the e-commerce application was laid out. Here's what was accomplished:


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

Project Structure Setup:

The project directory was organized into separate frontend and backend folders to maintain a clean and scalable structure.
Frontend Setup:

A React application was initialized in the frontend folder using create-react-app, providing a solid foundation for building the user interface.
Tailwind CSS was configured to style the frontend with utility-first, responsive styles, ensuring a modern and customizable design approach.
Backend Setup:

A basic Node.js server was set up in the backend folder using Express, laying the groundwork for API integrations in future milestones.
nodemon was installed and configured to automatically restart the server on code changes for a smoother development experience.
Login Page Development:

A Login Page was created in React to allow users to authenticate with the system. The page includes:
Email and password input fields.
A styled submit button.
Basic form handling using React hooks for managing input values and form submission.
Tailwind CSS was used to style the Login Page, making it responsive and visually appealing.
Deployment Preparation:

Initial steps for deploying the frontend app using GitHub Pages were set up, including the installation of gh-pages and configuration of the necessary deployment scripts.

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



### Milestone 5: Building the Sign-Up Page  
In this milestone, I focused on creating the frontend Sign-Up Page for the E-commerce application and implemented form validation to ensure smooth user interaction and data integrity.

#### Key Accomplishments:  
1. **Sign-Up Page Design**:  
   - Developed a clean and user-friendly UI using HTML and CSS.  
   - Included fields for Name, Email, and Password.  

2. **Form Validation**:  
   - Ensured that email addresses follow a valid format (e.g., `example@domain.com`).  
   - Added password validation to meet minimum security criteria, such as length and complexity.  
   - Provided error messages for invalid inputs.  

3. **Responsive Design**:  
   - The Sign-Up Page is responsive and works well across different devices.  

#### Challenges Faced:  
- Debugging input validation logic for edge cases.  
- Ensuring compatibility with different browsers.  

## Milestone 6: Backend Endpoint for Secure Signup 🚀

### Overview
In this milestone, we focused on creating a secure backend endpoint for the Signup page. This involved encrypting user passwords and securely storing user data in the database.

### Features Implemented
1. **Password Encryption**:
   - Used `bcrypt` to hash user passwords during the signup process.
   - Ensured only the hashed password is stored in the database, protecting user data from potential breaches.

2. **User Data Storage**:
   - Designed a schema to store user details, including:
     - Name
     - Email
     - Password (hashed)
     - Additional relevant fields as required.
   - Ensured proper validation and error handling during the signup process.

### Technologies Used
- **Node.js** for backend logic.
- **Express.js** for building the API endpoint.
- **bcrypt** for password hashing.
- **MongoDB** as the database to store user data.

### How It Works
1. Users submit their details through the signup form.
2. The backend API hashes the password using `bcrypt`.
3. The hashed password, along with other user details, is stored in the MongoDB database.

### Code Repository
You can find the updated code for this milestone [here](https://github.com/Shubh-Nawani/Ecommerce-Follow-Along/tree/main).

---
# Milestone 7: Create a Backend Endpoint for User Login

## Welcome, Kalvians! 🌟

In this milestone, we will create a backend endpoint to handle user login by validating credentials and verifying encrypted passwords stored in the database. Let's dive in!

---

## Learning Goals 🎯
By the end of this milestone, you will:

- Understand how to validate user credentials during login.
- Learn how to compare an encrypted password with the user's input.

---

## Why Encrypt Passwords?

### Protect User Data
Keeps passwords safe even if the database is compromised.

### Privacy
Ensures passwords are not stored in plain text.

### Compliance
Meets security standards like GDPR and PCI-DSS.

### Prevents Password Theft
Hashed passwords are difficult to decipher, increasing security.

---

## How Login Authentication Works 🔑

### 1. User Enters Credentials
The user provides their email/username and password on the login page.

### 2. Fetch User Data from Database
- The backend retrieves the user record based on the provided email/username.
- If the user is not found, return an error: **"User does not exist."**

### 3. Compare Encrypted Passwords
- Process the user's input password using the same hashing algorithm (e.g., bcrypt).
- Compare the resulting hash to the stored hashed password.
- If they match, the user is authenticated; otherwise, send an error.

---

## Steps for Milestone 7 📝

### 1. Create Login Endpoint
- Accept user credentials (email/username and password) through a POST request.
- Retrieve the corresponding user from the database.

### 2. Validate Password
- Use bcrypt to hash the entered password.
- Compare it with the stored hashed password to authenticate the user.

> **Note:** Password hashing is a one-way process. Instead of decrypting, we compare hashes.

---

## Example Code

### Backend Endpoint
```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model

const router = express.Router();

// Login Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Authentication successful
    res.status(200).json({ message: 'Login successful', user: { email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
```

---



# Milestone 8: Create a Frontend Card Component and Design the Homepage

## Welcome, Kalvians! 🌟

In this milestone, we will create a card component for showcasing products and design a homepage layout to display these cards effectively. Let's dive in!

---

## Learning Goals 🎯
By completing this milestone, you will:

- Learn how to create a reusable card component.
- Understand how to dynamically display product cards on the homepage.

---

## Why Create Card Components?

### Showcase Products Effectively
Present product details (e.g., name, price, image) in a visually appealing and organized manner.

### Reusable Design
A single component can be reused across different pages or sections of your application.

### Improved User Experience
Allows users to browse and interact with products easily.

### Organized Layout
Keeps the homepage clean, structured, and professional.

---

## How to Display a Single Card for Multiple Products

### Create a Dynamic Component
Design a card component that accepts product details as props (e.g., name, price, image).

### Use Mapping
Iterate over the product list using array mapping and render a card for each product.

### Pass Data Dynamically
Supply each card with unique product information (e.g., name, price, image).

### Maintain Consistency
Ensure the layout remains uniform for all cards.

---

## Steps for Milestone 8 📝

### 1. Create the Card Component
- Design a reusable component with props to accept:
  - Product name
  - Product image
  - Product price
- Include basic styles for the card (e.g., border, shadow, padding).

### 2. Design the Homepage Layout
- Set up a layout using CSS Grid or Flexbox for neatly displaying multiple cards.
- Add responsive styling to ensure the design works on different screen sizes.

---

## Example Code

### Card Component
```jsx
import React from 'react';
import './Card.css'; // Create a separate CSS file for styling

const Card = ({ name, image, price }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <h3 className="card-title">{name}</h3>
      <p className="card-price">${price}</p>
    </div>
  );
};

export default Card;
```

### Homepage Layout
```jsx
import React from 'react';
import Card from './Card';
import './Homepage.css';

const products = [
  { id: 1, name: 'Product 1', image: '/images/product1.jpg', price: 29.99 },
  { id: 2, name: 'Product 2', image: '/images/product2.jpg', price: 19.99 },
  { id: 3, name: 'Product 3', image: '/images/product3.jpg', price: 39.99 },
];

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <Card
            key={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
```

### CSS Example (Card.css)
```css
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  border-radius: 8px;
}

.card-title {
  font-size: 18px;
  margin: 8px 0;
}

.card-price {
  font-size: 16px;
  color: #007BFF;
}
```

### CSS Example (Homepage.css)
```css
.homepage {
  padding: 16px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
}
```

---
