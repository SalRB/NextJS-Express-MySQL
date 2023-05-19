
# NextJS-Express-MySQL

# ReadItAll

Made by [`Salva Roig Bataller`](https://github.com/SalRB)

## Prerequisites

* [npm](https://www.npmjs.com/)
* [docker](https://www.docker.com/)
* [docker-compose](https://docs.docker.com/compose/)

## Starting up the app

1. Clone the repo.

2. Create the following .env file on the corresponding folders of the repo with this variables:

    1  /.env
      * UID=1000
      * GID=1000
      * MYSQL_DATABASE=books
      * MYSQL_USER=
      * MYSQL_PASSWORD=
      * MYSQL_ROOT_PASSWORD=
      * BACKEND_LOCAL_PORT=8000
      * BACKEND_DOCKER_PORT=8000
      * FRONTEND_LOCAL_PORT=3000
      * FRONTEND_DOCKER_PORT=3000

    2  /backend/.env
      * SECRET=
      * PORT_BACKEND=8000
      * MYSQL_DATABASE=books
      * MYSQL_USER=
      * MYSQL_PASSWORD=
      * MYSQL_ROOT_PASSWORD=

    3  /frontend/.env
      * NEXTAUTH_SECRET=
      * NEXTAUTH_URL=http://localhost:3000

3. Create secret.js file on /frontend/src folder with this content:
``` js
    const secret = {
        EXPRESS_APP_URL: "http://localhost:8000/api",
        GOOGLE_API_URL: "https://www.googleapis.com/books/v1",
        JWT_SECRET: ""
    }

    export default secret;
```

4. Go to repo main folder and do 'docker-compose up'

      Following this steps, app is running on [localhost:3000](http://localhost:3000).

## Features

This application have the following modules.

Module | Description
:--- | :---
Search | An advanced search function that allows you to search for any book in the google database using the title, the author or the ISBN.
Details | Page where we can comment or register the book and then rate it, mark it as a favorite, etc.
Profile | A profile page where you can view different data like: favorite books, registered books, posted comments and objectives. 
Login | It allows you to register and login in the application.

## Technologies

### Deploy

The technology used for deploy is [docker](https://www.docker.com/)

  * Docker
  * docker-compose
  * Env files configuration

### Frontend

The technology used for the client is [Next.js](https://nextjs.org/) in its 13.4.2 version. 
    
  * Provider-Core structure
  * Consumers-Queries-Api structure
  * Routes
  * Components
  * Authentication
      * JWT Token
  * Pages
  * Toastr
  * Validation

### Backend

The technology used for the server is [Express](https://expressjs.com/) in its 4.18.2 version.

  * Routes
  * Controllers
  * Models
  * MySQL controller
  * Auth required endpoints

### Database

Server uses a [MySQL](https://www.mysql.com/) database in its 8.0 version.