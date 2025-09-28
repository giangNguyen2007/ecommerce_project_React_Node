





# Launch backend application


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
# the server will be listenning to http://localhost:4000


# to remove the container
docker-compose down
```



# Launch frontend application

Execute following commands inside the front root folder to build docker image and launch the container


install dependencies

```bash
# pwd = /frontend

# build docker image from source code
docker-compose build


# launch container
docker-compose up
# the nginx server will be listenning to http://localhost:80


# to remove the container
docker-compose down

```

