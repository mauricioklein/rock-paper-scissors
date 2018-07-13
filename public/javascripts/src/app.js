const ApiProxy = require("./api_proxy")
const Dom = require("./dom")

const dom = new Dom()

const optionEventHandler = (ev) => {
  ApiProxy.call(dom.gameType, ev.target.value)
    .then(response => (
      response.json().then(json => (
        response.ok ? json : Promise.reject(json)
      ))
    ))
    .then(data => dom.renderResult(data))
    .catch(err => console.error("Error contacting API: ", err))
}

// Player 1 options click handler
dom.optionsSelector.forEach(option => {
  option.addEventListener("click", ev => optionEventHandler(ev))
})

// New game button handler
dom.newGameButton.addEventListener("click", () => {
  dom.startNewGame()
})
