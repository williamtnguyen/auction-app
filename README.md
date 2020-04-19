# Auctioneer
Auctioneer is a full-stack web application built with a MERN stack:
* MongoDB Atlas as a cloud DBaaS hosted on AWS
* Express v4.17.1 as a backend framework for the API
* React v16.13.0 and Redux v4.0.5 for client-side application/state management
* Node v12.6.0 as a server/client runtime environment
* The app is also built with cool npm packages such as:
  * passport-jwt for JWT authentication
  * bcryptjs for password-salt hashing
  * validator for input validation
  * multer for file-input POST endpoints

## Installation 
With npm-scripts (located in ./package.json), installing the dependencies on both the server/client side can be done in the root directory:
```shell
$ npm install
$ npm run client-install
```
### Starting Servers Concurrently
Leveraging [concurrently](https://github.com/kimmobrunfeldt/concurrently) v5.1.0 allows both the Express and React servers to be started concurrently (i.e., without needing two terminals) from the root directory. 
```shell
$ npm run dev
```
Alternatively, the Express server can be started individually for API testing:
```shell
