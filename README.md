# express-mongoose-crud-operation

is a project which created in express.js.
It has all crud operation dealing with mongoose database.
It also has test cases for all crud operation.

Technologies used --
  1. express.js
  2. mocha
  3. chai
  4. istanbul
  5. mongoose
  6. node.js
  7. npm

to start----
  
  just start the server (npm start)
  1. for view document - localhost:3000/find
  2. for insert document - localhost:3000/insert
  3. for update document - localhost:3000/update/:name
  4. for delete document - localhost:3000/delete/:name

folder structure--

  1. test - contains appTest.js
  2. routes - contains all routes
  3. config - contains config.js which mongoDB connection
  4. model - contains schema.js which has schema of collection
  5. logs - contains log file
  
file--

  1. app.js - starting file which contains all path to routes, server
  2. package.json - json files which contains all dependancies
  
