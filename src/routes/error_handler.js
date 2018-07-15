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
  notFoundAsJson: notFoundAsJson,
  notFoundAsHtml: notFoundAsHtml
}
