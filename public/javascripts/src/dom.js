const Helper = require("./helper")

const Dom = function() {
  this.optionsSelector = $("[id^=gameOption-]")
  this.player2 = {
    container: $("#player2-container"),
    choice: $("#player2-container > #choice")
  }
  this.result = {
    container: $("#result-container"),
    winner: $("#winner")
  }
  this.newGameButton = $("#new-game")
  this.gameType = $("#gameType").val()
}

Dom.prototype = {
  renderResult: function({ player_1_choice, player_2_choice, winner }) {
    this.setPlayer1Choice(player_1_choice)
    this.setPlayer2Choice(player_2_choice)
    this.setWinner(winner)

    this.showResult()
  },

  startNewGame: function() {
    this.hideResult()
    this.showOptions()
  },

  setPlayer1Choice: function(choice) {
    this.optionsSelector
      .filter((_, el) => el.value !== choice)
      .addClass("hidden")
  },

  setPlayer2Choice: function(choice) {
    this.player2.choice.attr("src", Helper.imgPath(choice))
  },

  showOptions: function() {
    this.optionsSelector.removeClass("hidden")
  },

  setWinner: function(winner) {
    this.result.winner.text(Helper.winnerLine(winner))
  },

  showResult: function() {
    this.player2.container.removeClass("hidden")
    this.result.container.removeClass("hidden")
  },

  hideResult: function() {
    this.player2.container.addClass("hidden")
    this.result.container.addClass("hidden")
  }
}

module.exports = Dom
