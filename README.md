# Auctioneer
Auctioneer is a full-stack web application built with a MERN stack:
* MongoDB Atlas as a cloud DBaaS hosted on AWS
* Express v4.17.1 as a backend framework for the API
* React v16.13.0 and Redux v4.0.5 for client-side application/state management
* Node v12.6.0 as a server/client runtime environment

The app is also built with cool npm packages such as:
  * [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) for JWT authentication
  * [bcryptjs](https://github.com/kelektiv/node.bcrypt.js/) for password-salt hashing
  * [axios](https://github.com/axios/axios) for HTTP client
  * [validator](https://github.com/validatorjs/validator.js) for input validation
  * [multer](https://github.com/expressjs/multer) for file-input POST endpoints

## Installation 
With npm-scripts *(located in ./package.json)*, installing the dependencies on both the client/server side can be done in the root directory:
```shell
$ npm install
$ npm run client-install
```
Because some of the scripts use [nodemon](https://github.com/remy/nodemon) to start servers, it will have to be installed separately as a devDependency:
```shell
$ npm i nodemon --save-dev
```
### Starting Servers Concurrently
Leveraging [concurrently](https://github.com/kimmobrunfeldt/concurrently) v5.1.0 allows both the Express server and React application to be started concurrently (i.e., without needing two terminals) from the root directory: 
```shell
$ npm run dev
```
Alternatively, the Express server can be started individually for API testing:
```shell
$ npm run server
```
Likewise, the React application can be started individually as well:
```shell
$ npm run client
```

<!-- ## Project Architecture
User stories and business logic can be inferred from this UI Transition Diagram:
<img src='https://i.imgur.com/HjcudXg.jpg' title='UIDiagram' width='' alt=''/> -->
