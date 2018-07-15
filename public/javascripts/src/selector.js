class Selector {
  static get header() { return document.querySelector("#header") }

  static get player1Container() { return document.querySelector("#player1-container") }

  static get optionsSelector() { return document.querySelectorAll("[id^=gameOption-]") }

  static get player2Container() { return document.querySelector("#player2-container") }
  static get player2Choice() { return document.querySelector("#player2-container > #choice") }

  static get resultContainer() { return document.querySelector("#result-container") }
  static get resultWinner() { return document.querySelector("#winner") }

  static get newGameButton() { return document.querySelector("#new-game") }
  static get gameType() { return document.querySelector("#gameType") }
}

module.exports = Selector
