(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ApiProxy = function() {}

ApiProxy.prototype.call = function(gameType, p1Choice = null, p2Choice = null) {
  const body = {
    p1_choice: p1Choice,
    p2_choice: p2Choice
  }

  return fetch(`/game/${gameType}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
}

module.exports = ApiProxy

},{}],2:[function(require,module,exports){
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

},{"./api-proxy":1,"./dom":3}],3:[function(require,module,exports){
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

},{"./helper":4}],4:[function(require,module,exports){
const Helper = {
  imgPath: (imgName) => (
    `/images/game-options/${imgName}.png`
  ),
  
  winnerLine: (winner) => {
    switch(winner) {
      case "Player 1":
        return "You won!"

      case "Player 2":
        return "You lost!"

      default:
        return "Draw!"
    }
  }
}

Object.freeze(Helper)

module.exports = Helper

},{}]},{},[2]);
