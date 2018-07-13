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

const notFoundAsHtml = (response, gameType) => {
  response
    .render("error", {
      message: `${gameType} isn't a valid game`
    })
}

module.exports = {
  notFoundAsJson: notFoundAsJson,
  notFoundAsHtml: notFoundAsHtml
}
