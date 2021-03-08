# Prototype of yelp application
Scalable and distributed replica of Glassdoor application using React-Redux, NodeJS, Express, Kafka MQ & MongoDB. The application has three personas - Student, Company, and Administrator.




## Steps to deploy the application
Install node.js

### Backend
1. Git clone the Backend folder.
2. Open the terminal in the folder "Backend".
3. Execute "npm install" to install all the dependencies.
5. Update db.config.js file in Backend folder with database name and connection details.
6. Update the app.js file in Backend folder with Frontend server's IP address and port.
7. Run node index.js

### Frontend
1. Git clone the Frontend folder.
2. Open the terminal in the folder "frontend".
3. Update the webConfig.js file in frontend/src folder with the backend server's IP address and port.
4. Execute "npm start" to run the frontend server. Run npm start.

### Kafka-backend
1. Open new terminal redirect to kafka-backend
2. Run npm server.js 
Note: Create all required topics and check db config files.

This will launch the application

Open the browser and navigate to Frontend server's IP address with Port number (Eg: 127.0.0.1:3000)
