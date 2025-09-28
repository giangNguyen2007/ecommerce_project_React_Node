




# 1. Backend application
## 1.1 Overview

The backend has been developped with the following technical choices:
- MongoDB database hosted on MongoDb Atlas, connection string is provided in .env.example
- Prisma ORM is used to handle complex database requests 
- Data validation by express-validator
- Authentication is implemented using jwtwebtoken
- Middlewares are used extensively to centralise : data validation, authentication & authorisation, error handling
- Endpoint testing using Jest


## 1.2 Endpoints

The exposed endpoints are :

+ /api/auth : for register and login
+ /api/user : to get all user info (admin only), update user data, add favorite product
+ /api/product : product CRUD (admin only for POST/UPDATE/DELETE)
+ /api/comnments : comments CRUD
+ /api/cart : cart CRUD (to record pending cart state, and persist cart data across logout/login cycle)
+ /api/order : order CRUD (orders are carts that has been checked out, and contain additional information about order status, user address)

##  1.3 Application Build & Launch 

```bash

# pwd = /backend

# create .env file by copying .env.example
# this is to simulate the insertion of secrets into .env file
cp .env.example .env

# build docker image from source code
docker-compose build
# the image building process, which involves downloading all dependencies, will take a while to finish


# launch container
docker-compose up
# the server will be listenning at http://localhost:4000


# to remove the container
docker-compose down
```



# 2. Frontend application

## 2.1 Overview

The frontend application is dvelopped in React and Typescript, with following technical choice:
- axios for all backend communications, with all API functions separated from React component code
- combination of useContext & useReducer for managing user authentication state & cart state
- extensive use of custom hooks for better code organisation

## 2.2 Site interface

The ecommerce site's interface is simple and self-explainatory. 

To add any product to cart, user has to create an account and login, as well as select product size & color. A default account is available : { username: guest, email: guest@gmail.com, password: 12345) 

Cart state is saved across logout/login cycle, by clicking on the "Save Cart" button. 


## 2.2 Application build & Launch

Execute following commands inside the frontend root folder to build docker image and launch the container


```bash
# pwd = /frontend

# build docker image from source code
docker-compose build


# launch container
docker-compose up
# the nginx server will be listenning at http://localhost:80


# to remove the container
docker-compose down

```

