# node-backend-member
Project built with NodeJs, allow user login/sign-up. Have 2 role normal user and admin. Admin can remove user

# Technology Stack
 - NodeJs
 - MongoDB/Mongoose
 - Html/Css/Jquery
 
# Set up and instruction

 1. Navigate to folder project and do command : "npm install"
 2. Install MongoDb and restore dump data from node-backend-member/Getlinks
  - Install : https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
  - Dump data : ./mongorestore dump/GetLinks/
 3. Start application with command : "node src/server.js" -> Navigate browser to "localhost:4200"
 4. Login with admin user "admin123/123123" Admin can see the list of user and delete them. Normal User only see his info
 5. Sign up feature.
  - Pros : All features are done with validation at BE side.
  - Cons : UI is not focus of this test.

# Testing
 1. run test with command "npm run test-watch"
  
 
