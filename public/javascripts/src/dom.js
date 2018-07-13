const Helper = require("./helper")

class Dom {
  constructor() {
    this.optionsSelector = document.querySelectorAll("[id^=gameOption-]")
    this.player2 = {
      container: document.querySelector("#player2-container"),
      choice: document.querySelector("#player2-container > #choice")
    }
    this.result = {
      container: document.querySelector("#result-container"),
      winner: document.querySelector("#winner")
    }
    this.newGameButton = document.querySelector("#new-game")
    this.gameType = document.querySelector("#gameType").value
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
      .call(this.optionsSelector, option => option.value !== choice)
      .forEach(option => option.classList.add("hidden"))
  }

  setPlayer2Choice(choice) {
    this.player2.choice.src = Helper.imgPath(choice)
  }

  showOptions() {
    this.optionsSelector
      .forEach(option => option.classList.remove("hidden"))
  }

  setWinner(winner) {
    this.result.winner.innerText = Helper.winnerLine(winner)
  }

  showResult() {
    this.player2.container.classList.remove("hidden")
    this.result.container.classList.remove("hidden")
  }

  hideResult() {
    this.player2.container.classList.add("hidden")
    this.result.container.classList.add("hidden")
  }
}

module.exports = Dom
