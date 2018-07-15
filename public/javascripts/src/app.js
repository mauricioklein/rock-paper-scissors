const ApiProxy = require("./api_proxy")
const Helper = require("./helper")
const Dom = require("./dom")
const Selector = require("./selector")

const dom = new Dom()

document.addEventListener("DOMContentLoaded", () => {
  ApiProxy.gameDescription(Helper.discoverGameType(window.location.pathname))
    .then(response => (
      response.json().then(json => (
        response.ok ? json : Promise.reject(json)
      ))
    ))
    .then(gameDescription => dom.initScreen(gameDescription, optionEventHandler))
    .catch(err => console.error("Error contacting API: ", err))
})

const optionEventHandler = (ev) => {
  ApiProxy.call(Selector.gameType.value, ev.target.value)
    .then(response => (
      response.json().then(json => (
        response.ok ? json : Promise.reject(json)
      ))
    ))
    .then(data => dom.renderResult(data))
    .catch(err => console.error("Error contacting API: ", err))
}

// New game button handler
Selector.newGameButton.addEventListener("click", () => {
  dom.startNewGame()
})
