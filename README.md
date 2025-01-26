# Job Target - Full Stack Application

This project consists of a **Flask** backend and a **React** frontend to display job listings. 
The frontend fetches data from the backend using REST API endpoints.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Installation](#backend-installation)
- [Frontend Installation](#frontend-installation)
- [Installation Using Docker](#installation-using-docker)
- [Steps To Make Production Ready](#steps-to-make-production-ready)

## Prerequisites

Before you begin, make sure you have the following software installed on your system:

- **Python** (for the Flask backend) [Download Python](https://www.python.org/downloads/)
- **Node.js** (for the React frontend) [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager, installed automatically with Node.js)
  
## Backend Installation

### Step 1: Clone the Repository

Clone the repository to your local machine:

  ```
  git clone https://github.com/arepala-uml/jobtarget-project
  ```
Move to the project directory:
  ```
  cd jobtarget-project
  ```
### Step 2: Set Up the Virtual Environment
Follow these steps to create and activate a virtual environment for the backend server:

1. #### Navigate to the server/ folder:
    ```
    cd server
    ```
2. #### Create a virtual environment (this is done only once)
     ```
     python3 -m venv venv
     ```
3. #### Activate the virtual environment:

    * On macOS/Linux:
      ```
      source venv/bin/activate
      ```
    * On Windows:
      ```
      venv\Scripts\activate
      ```
    Your terminal should now show that the virtual environment is active(indicated as (venv) at the beginning of the prompt).

4. #### Install the necessary dependencies:
    ```
    pip install -r requirements.txt
    ```
    This will install all the dependencies required for backend server.

### Step 3: Configure the Flask Backend Port
  By default, the Flask backend will run on port 5000. If you want to change the port, you can specify the new port in the .env file.

  #### Steps to change the port:
  1. #### Navigate to the server/ folder.
  2. #### Open .env file
  3. #### Set the desired port in the .env file:

  ```
  FLASK_APP_PORT=5000  # Default is 5000, you can change it here
  ```
   If you don’t modify the .env file, the backend will use the default port 5000.

### Step 4: Run the Flask Server

  #### Run flask for develop
  ```
  python app.py
  ```
  In flask, Default port is `5000`


 #### Run flask for production

  ** Run with gunicorn **
  
  ```
  gunicorn -w 4 --bind 0.0.0.0:5000 app:app
  ```
  * -w : number of worker

  #### Run with Docker

  ```
   docker build -t flask-example
   docker run -p 5000:5000 --name flask-example flask-example 
   
  ```
  In image building, the server folder will also add into the image
    
### Step 5: Access the flask backend server
  ```
  http://localhost:5000
  ```
  The backend will be available at above link (or the port you’ve specified in .env)


## Frontend Installation

#### Step 1: Navigate to Frontend Folder
  Navigate to the `ui/` directory
  ```
  cd jobtarget-project/
  cd ui/
  ```

#### Step 2: Install Frontend Dependencies
  Install the necessary dependencies for React:
  ```
  npm install
  ```
  This installs all the required React libraries from package.json

#### Step 3: Set Up the `.env` File for React
  Open `.env` file in the ui/ folder to specify the backend hostname and port:
  ```
  REACT_APP_BACKEND_HOST=localhost
  REACT_APP_BACKEND_PORT=5000  # Default is 5000, you can change it here to match your backend
  ```
  This will allow the React app to communicate with the backend on the port you’ve specified.


#### Step 4: Start the React Development Server
Run the React frontend development server:
```
npm start
```
The frontend will be available at `http://localhost:3000`.

## Installation Using Docker

Dont follow the below steps if you have already followed the Backend and Frontend installation.
Please do the below steps if you want to deploy as containerized applications.

### Prerequisites
Before you start, you need to have the following software installed:

#### Step 1: Installation of docker if not exists
  * On macOS:
    Install Docker Desktop from [here](https://www.docker.com/products/docker-desktop).
    
  * On Windows:
    Install Docker Desktop from [here](https://www.docker.com/products/docker-desktop).
    
#### Step 2: Check for docker and docker-compose version
  After installing, check for version
  ```
  docker --version
  docker-compose --verison
  ```
#### Step 3: Bring up the frontend and backend application
  ```
  docker-compose down
  docker-compose up -d
  ```
  Access the application at `http://localhost:3000`

## Steps To Make Production Ready
  To make this application production-ready, we should implement below things:
  
  * For persistent data storage, we need to integrate a relational (Ex: MySQL) or NoSQL database (Ex: MongoDB) to replace the static jobs.json file, enabling dynamic data handling and 
    scalability.
  * Need to have secure communication by enforcing HTTPS for both frontend and backend, using SSL/TLS certificates.
  * We need to containerize our application to make it production ready and I already did that in this project. But, I did not configure the supervisord and we need to have this because 
    it ensures that all services run smoothly and automatically restart in case of failures.
  * We need to deploy the application in scalable environments like Kubernetes with auto-scaling to handle varying traffic loads.
  * We need to have automated CI/CD pipelines using Jenkins to automate process of build,test and deploy of our app.
  * We need to write unit tests for both the frontend and backend to ensure the correctness of individual components using modules like pytest.
  * We need to have TypeScript into the React frontend for better type safety and easily can identify type errors during development.
