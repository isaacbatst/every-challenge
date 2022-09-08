# Every Challenge

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

### User
- Password: Minimum eight characters, at least one letter and one number
- Name: Minimum two characters, up to 80 characters.

### Task
- Title: Minimum one character, up to 50.
- Description: Minimum one character, up to 200.
- Status: TODO, IN_PROGRESS, DONE, ARCHIVED


### Local Setup
- Create a `.env` with required fields (see `.env.example`)
- Have a MongoDB 4.2+ server with a replica set deployment.