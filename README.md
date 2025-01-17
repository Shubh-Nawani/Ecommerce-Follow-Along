Ecommerce-Follow-Along
-------------------------

## Project Description
 In this project, you'll create a scalable e-commerce application based on the MERN stack. There you'll learn basics of full-stack development and perform user authentication, product management, and order handling.

-------------------------------

## Milestone 1: Project Overview

### Learning Objectives
 Understand the general structure of a MERN project.
 Create a new project with success.
 Know what an e-commerce application is.
- Project repository should be ready by the next milestone.

### Primary Topics Discussed
1. **Introduction to the MERN Stack:**
   A JavaScript-based technology stack for the development of web applications as full-stack.
   It enables development of both front-end and back-end using one process using JavaScript only.

2. **REST API Structure and Endpoints:
-An architectural style in designing web services.
Some of the example functionalities:
User Authentication: register and login to the user
Product Management: create, update, retrieve information to be presented about the products
Order Management: handle the orders placed by the customers
API endpoints will have to speak to the database. Access to the database acquire data to present as JSON

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

Milestone 3: Project Setup for Backend 🚀

In this milestone, we focused on setting up the backend to support the growing needs of our e-commerce application. This involved structuring backend code, connecting to MongoDB, and implementing basic error handling.

Key Achievements

Backend Folder Structure:

Organized the backend code into dedicated folders:

routes/: For defining API routes.

controllers/: To handle request and response logic.

models/: For database schemas and models.

middlewares/: For reusable middleware functions.

utils/: For utility/helper functions.

Server Setup:

Initialized a Node.js server using Express.js.

Configured the server to listen on a designated port.

Database Connection:

Integrated MongoDB for efficient data storage and management.

Verified the connection between the server and MongoDB.

Error Handling:

Added basic error-handling mechanisms to:

Provide clear error messages for debugging.

Ensure the server runs smoothly under various conditions.

Documentation Updates:

Updated the README file to reflect progress in Milestone 3.

Getting Started

To set up the backend on your local machine:

Clone the repository:

git clone <repository-link>
cd Ecommerce-Follow-Along

Install dependencies:

cd backend
npm install

Create a .env file in the backend/ directory with the following variables:

PORT=5000
MONGO_URI=<your-mongodb-connection-string>

Run the server:

npm start

Verify database connection:

Check the console for a success message confirming the MongoDB connection.


