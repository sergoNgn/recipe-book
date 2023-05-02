## Recipe Book

Recipes Book web app

### Requirements

For building and running the application you need:

- docker
- node 19
- JDK 17
- Maven 3

#### Running the application locally

There are several ways to run a web app. One way is to run docker-compose up in the root directory.
Application will start on localhost:8081

Alternatively you can run applications (client and server) separately.
Firstly naviaget to recipes-service and run java app.
Then naviagte to recipes-web and run npm start.
recipes-web will run on localhost:3000.
recipes-service will run on localhost:8080

#### docs for REST endpoints can be found by link

if you run docker the rest docs can be found on http://localhost:8081/api/swagger-ui/index.html#/
Or if you run recipes-service separately then on http://localhost:8080/api/swagger-ui/index.html#/

### Copyright
