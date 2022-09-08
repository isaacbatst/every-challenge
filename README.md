# Every Challenge

## Deploy

The project is deployed at [vercel](https://every-challenge.vercel.app/api/).

You can find the api documentation [here](https://documenter.getpostman.com/view/9558570/VVBUyn1t).

> The mongodb server is a mongodb atlas project.

## Setup

You have 3 possible setups.

1. **Bare Setup** Run `yarn dev` on your machine
  - Make sure you have a MongoDB 4.2+ server with a replica set deployment.
  - Fill `.env` with server connection url and a jwt secret.
2. **Docker for dev** Use `docker-compose.yml`
  - Run `docker compose up -d`. It will build the node service and the mongo service.
  - Enter the `app` container with `docker exec -it every-todo-app bash`
  - Inside the container, run `yarn dev`
3. **Docker for prod** Use `docker-compose-prod.yml`
  - First, you have to edit `next.config.js`, uncommenting the `standalone` mode.
  - Then `docker compose --file docker-compose-prod.yml up -d`
  - Wait the build finish, and that's it.

## Requirements
### Domain (with tests)
- [X] Create User
- [X] Authenticate User
- [X] Create Task
- [X] Get My Tasks
- [X] Change Task Status
### Application
- [X] Create User
- [X] Authenticate User
- [X] Create Task
- [X] Get My Tasks
- [X] Change Task Status

## The Whys
### Architecture
I chose to invest time into the domain layer. I have used OOP features and SOLID principles, to ensure the quality and the decoupling of this layer, giving us:
  - isolated testing easily, ensuring the domain logic separatedly
  - a more comfortable way to change the "edge techs", such as the chosen Next and Prisma, as the logic is protected at the domain.
  - clear separation of responsabilitties.

### Next.js
I first thought on writing a simple express API, but I chose Next, thinking on:
  - Deploying at a serverless solution easily, like vercel.
  - Expanding to a fullstack project (adding frontend).

### Cookies + JWT
First, I chose to use Cookies (http-only) and not returning the token to the client handle it, to take the responsability, as this is only a backend project, I chose to control how safely the token is being stored.

Second, about JWT: in order to don't have to create a *Session persistance*, I brought JWT to give me a easy way to identify users. I won't have the power to invalidate a session or to manage them somehow - like listing the user's sessions for him - but for the given use case, the JWT fits.

### Bcrypt.js
A nice solution to generate salted passwords hashes without caring to store the salt, in order to at the login compare the hash with a provided password.

### Prisma
Excelent solution to build up the database models quickly.

### MongoDB
Given the simplicity of the data, I didn't have to enforce complex relationships, so I picked Mongo, witch comes with the Replica Set feature, focused on high availability, that scales very well the reading power.

## Specifications

### User
- Password: Minimum eight characters, at least one letter and one number
- Name: Minimum two characters, up to 80 characters.

### Task
- Title: Minimum one character, up to 50.
- Description: Minimum one character, up to 200.
- Status: TODO, IN_PROGRESS, DONE, ARCHIVED

### Authentication
- The cookie `Every-todo-app-Authorization` is saved at login and user creation, with a signed JWT.