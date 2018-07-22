const bodyParser = (req, res, next) => {
  if(!["POST", "PUT"].includes(req.method)) {
    return next(req, res)
  }

  const body = []

  req
    .on("data", chunk => { body.push(chunk) })
    .on("end", () => {
      req.body = JSON.parse(Buffer.concat(body).toString())
      next(req, res)
    })
}

module.exports = {
  bodyParser: bodyParser
}
