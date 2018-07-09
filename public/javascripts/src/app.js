(() => {
  const ApiProxy = require("./api-proxy")
  const Dom = require("./dom")

  const apiProxy = new ApiProxy()
  const dom = new Dom()

  // Player 1 options click handler
  dom.optionsSelector.on("click", (ev) => {
    apiProxy.call(dom.gameType, ev.target.value)
      .then(resp => resp.json())
      .then(data => dom.renderResult(data))
  })

  // New game button handler
  dom.newGameButton.on("click", () => {
    dom.startNewGame()
  })
})()
