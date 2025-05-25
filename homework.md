- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handler for /test, /hello
- Install nodemon and update script inside package.json 
- difference between caret and tilda (^ VS ~)
- What is the use of "-g" while npm install

- initialize git
- .gitignore
- Create a remote repo on github
- push all code to remote origin 
- Play with routes and routes extentions ex. /hello, / , hello/2, /xyz
- Install Postman app and make a workspace/collection > test API call
- Write logic to handle GET, POST, PATCH, DELETE API calls and test them on Postman
- Explore routing and use of ?, +, (), * in the routs
- Use of regex in routes /a/, /.*fly$/
- Reading the query params in the routes
- Reding the dynamic routes

- Multiple Route handler - Play with the code
- next()
- next function and error along with res.send()
- app.use("/route", rH, [rH2,rH3], rH4, rH5);
- What is a Middleware
- How express JS basicaly handle request behind the scenes
- Differece between app.use and app.all 
- Write a dummy auth iddleware for admin
- Write a dumy auth middleware for all user routes, except /user/login
- Error handing using app.use("/", (err, req, res, next) = {})

- Create a free cluser on MongoDB official website (Mongo Atlas)
- Install mongooes library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectDB function and connect to database before starting application on 7777
- create a userSchema & user Model 
- create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try, catch

- Diffrerence between Object and JSON ? 
- Add the express.json middleware to your app
- Make your signup API dynamic to recive data from the end user
- User.findOne with duplicate email ids, which object returned
- API - Get user by email
- API - Feed API - GET /feed - get all the users from the databse


