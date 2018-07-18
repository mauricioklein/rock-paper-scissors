const fs = require("fs")
const path = require("path")

const fullpath = (relativePath) => {
  const appDir = path.dirname(require.main.filename)
  return `${appDir}/../${relativePath}`
}

const render = (res, data, contentType = "text/html") => {
  res.writeHead(200, { "Content-Type": contentType })
  res.write(data)
  res.end()
}

const renderFile = (res, filePath, contentType) => {
  const path = fullpath(filePath)

  fs.readFile(path, (err, data) => {
    if(err) {
      res.writeHead(404)
      res.write("Not found")
      res.end()
    } else {
      render(res, data, contentType)
    }
  })
}

const notFoundAsJson = (response, gameType) => {
  response.setHeader("Content-Type", "application/json")

  response
    .status(404)
    .send(
      JSON.stringify({
        error: `${gameType} isn't a valid game`
      })
    )
}

const notFoundAsHtml = (res) => {
  res.sendFile("error.html", { root: "views" })
}

module.exports = {
  render: render,
  renderFile: renderFile,
  notFoundAsJson: notFoundAsJson,
  notFoundAsHtml: notFoundAsHtml
}
