# Node+Nginx: request limitation

## Project description

### Node server

There is a [**Node server**](./src) with a single endpoint `/smile-station`.

The request rate to this endpoint is not limited.

The project is configured to start the server in a Docker container ([Dockerfile](Dockerfile)).

### Nginx reverse proxy

There is an [**Nginx reverse proxy**](./nginx) for the Node server.

It introduces additional endpoints: `/smile-station/1l` and `/smile-station/1h`. Each of these endpoints has a limited request rate:
   - `/smile-station/1l` - request rate is limited by 10/min;
   - `/smile-station/1h` - request rate is limited by 100/min.

The Nginx reverse proxy also starts in its Docker container ([Dockerfile](./nginx/Dockerfile)).

### Dockerization

A [docker-compose.yaml](docker-compose.yaml) file is responsible for building docker images and running containers.

### Testing

[Integration tests](./tests) are implemented for the Node+Nginx stack.

The very first test version was completely based on bash scripts:
   - [utils.sh](./tests/utils.sh) contains generic functions used in testing;
   - [integration.test.sh](./tests/integration.test.sh) contains a set of sequential tests;
   - [index.hs](./tests/index.sh) simply finds all `*.test.sh` files and runs them one by one.

Technically testing is leveraged by polling endpoints with curl. Requests for each endpoint are sent with a certain interval to receive the sequence of response status codes. The received status code sequence is compared with the expected one.

The first test version exits the process after any test fails so no further tests are not executed.

This behavior was fixed in the second edition by employing the Jest testing framework (switch to `develop-testing-in-jest` branch to see changes). There is a bash script for polling endpoints in this version, but tests are running in Jest.

#### Point for improvement
- Tests must be independent (add before/after to run each test in a new environment)

### Github Actions workflow

A Github Actions workflow ([ci.yml](./.github/workflows/ci.yml)) is implemented for test automation.

## How to use the project

### Starting and testing

1. Make sure you have Docker daemon installed and running.
2. `npm start` - this will transpile the TypeScript project (Node server) to JavaScript and start the dockerized Node+Nginx stack.
3. `npm test` - run integration testing for the Node+Nginx stack.
4. `npm run stop` - stop docker containers, and remove containers and images.

### Other commands

1. `npm run lint` - run Eslint testing for the TypeScript project (Node server).
2. `npm run dev` - run the TypeScript project (Node server) in the development mode.
3. `npm run build` - transpile the TypeScript project (Node server) to JavaScript.