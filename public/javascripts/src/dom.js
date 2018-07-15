const Selector = require("./selector")
const Helper = require("./helper")

class Dom {
  initScreen(gameDescription, callback) {
    const { type, options } = gameDescription

    document.title = type
    Selector.header.innerText = type
    Selector.gameType.value = type

    options.forEach(option => {
      Selector.player1Container.appendChild(
        Helper.createNodeOption(option, callback)
      )
    })
  }

  renderResult(data) {
    const player1Choice = data.player_1_choice
    const player2Choice = data.player_2_choice
    const winner = data.winner

    this.setPlayer1Choice(player1Choice)
    this.setPlayer2Choice(player2Choice)
    this.setWinner(winner)

    this.showResult()
  }

  startNewGame() {
    this.hideResult()
    this.showOptions()
  }

  setPlayer1Choice(choice) {
    Array.prototype.filter
      .call(Selector.optionsSelector, option => option.value !== choice)
      .forEach(option => option.classList.add("hidden"))
  }

  setPlayer2Choice(choice) {
    Selector.player2Choice.src = Helper.imgPath(choice)
  }

  showOptions() {
    Selector.optionsSelector
      .forEach(option => option.classList.remove("hidden"))
  }

  setWinner(winner) {
    Selector.resultWinner.innerText = Helper.winnerLine(winner)
  }

  showResult() {
    Selector.player2Container.classList.remove("hidden")
    Selector.resultContainer.classList.remove("hidden")
  }

  hideResult() {
    Selector.player2Container.classList.add("hidden")
    Selector.resultContainer.classList.add("hidden")
  }
}

module.exports = Dom
