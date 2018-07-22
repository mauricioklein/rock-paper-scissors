[![Build Status](https://travis-ci.org/mauricioklein/rock-paper-scissors.svg?branch=master)](https://travis-ci.org/mauricioklein/rock-paper-scissors)
[![codecov](https://codecov.io/gh/mauricioklein/rock-paper-scissors/branch/master/graph/badge.svg)](https://codecov.io/gh/mauricioklein/rock-paper-scissors)

# rock-paper-scissors

A simple rock-paper-scissors game implemented in NodeJS

## Dependencies:

- Node 6.0 or superior

## Game mode

The system supports two different game modes:

- **paper-rock-scissors**: accessible via `http://[endpoint]/game/paper-rock-scissors`
- **paper-rock-scissors-lizard-spock**: accessible via `http://[endpoint]/game/paper-rock-scissors-lizard-spock`

To start the system, please refer to the [Up and Running section](#up-and-running).

## Technical decisions

- **Business logic is stored in the backend:**
This approach was used for security reasons (makes cheating harder), guarantees that all clients are running the same algorithm version and makes easy to extend the game to support `user vs user` game mode.

- **Node app serves assets:**
Node app is also responsible to serve the webpages and necessary assets. JS files that run in browser are minified using [Browserify](http://browserify.org/).

- **No external frameworks used:**
This is due project restrictions. Thus, UI is build entirely using plain JS DOM selectors. As a more professional and scalable solution, some kind of reactive interface could be build, using React, VueJS, etc. Also, TypeScript in the backend would be a great improvement.
For the backend, Express and Pug support were removed from the original implementation in favour to
regular HTTP server + vanilla JS to inject the values into the HTML template.

- **Travis as CI and Codecov as code coverage reporter:**
The project is connected to [Travis.org](https://travis-ci.org/mauricioklein/rock-paper-scissors). So, every build generates a new build, running the specs and lints.
Also, code coverage is calculated using [Istanbul](https://istanbul.js.org/) and result is reported to [Codecov.io](https://codecov.io/gh/mauricioklein/rock-paper-scissors). Badges with the latest build status are available on this README header.

## Up and running

### Natively

```bash
# Install system dependencies
$ npm install

# Start server at port 3000
$ npm start
```

### Docker

This project has support to Docker:

```bash
# Build the Docker image with the application + dependencies installed
$ docker build -t paper-rock-scissors .

# Start the container, attaching to the localhost's port 3000
$ docker run -p 3000:3000 -d paper-rock-scissors
```



## Development

```bash
# Start the system in debug mode, with hot-reloading enabled
$ npm run-script debug
```

## Code quality

```bash
# Run the lint
$ npm run lint

# Run the specs
$ npm test
```


## Next steps

Due the limited time to implement the solution, some enhancements are possible and desirable:

1. E2E tests (probably using `Nightwatch` + `Headless Chrome`)
2. `Computer x Computer` game mode
3. UI enhancements
4. Score board

## Future enhancements

Below are some nice to have features for the future system

1. **User vs User game mode**
The entire business logic of the system is stored in the backend. This decision was made considering security (makes cheating more difficult) and guarantees that all users are running the same set of rules. Also, to implement `user vs user` game mode, the API is already ready for that. The work necessary is related to the communication between clients and server. A good approach would be use websockets.

2. **User profile**
Makes possible keep track of user's scores and rank boards with friends.
