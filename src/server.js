const http = require("http")

class Server {
  constructor(requestHandler) {
    this.server = http.createServer()
    this.middlewares = [requestHandler]
  }

  get httpServer() { return this.server }
  get address() { return this.server.address() }

  use(middleware) {
    // Last middleware is always the request handler
    this.middlewares.splice(-1, 0, middleware)
  }

  on(event, callback) {
    this.server.on(event, callback)
  }

  listen(port) {
    this.startListeners()
    this.server.listen(port)
  }

  startListeners() {
    this.on("request", (req, res) => {
      middlewareChain(this.middlewares)(req, res)
    })
  }
}

/**
 * middlewareChain chain the middleware functions, passing
 * the next function in the chain as the "next" parameter of the
 * previous function
 */
const middlewareChain = (funcs) => {
  return curryNext(funcs, 0)
}

/**
 * curryNext is a recursive function that chains the current middleware
 * to the curried version of the next middleware
 */
const curryNext = (funcs, index) => {
  const next = (index === funcs.length - 1) ? (_req, _res) => {} : curryNext(funcs, index + 1)
  return (req, res) => { funcs[index](req, res, next) }
}

module.exports = Server
