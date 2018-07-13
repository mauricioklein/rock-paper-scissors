const ApiProxy = require("./api_proxy")
const Dom = require("./dom")

const dom = new Dom()

// Player 1 options click handler
dom.optionsSelector.on("click", (ev) => {
  ApiProxy.call(dom.gameType, ev.target.value)
    .then(response => (
      response.json().then(json => (
        response.ok ? json : Promise.reject(json)
      ))
    ))
    .then(data => dom.renderResult(data))
    .catch(err => console.error("Error contacting API: ", err))
})

// New game button handler
dom.newGameButton.on("click", () => {
  dom.startNewGame()
})
