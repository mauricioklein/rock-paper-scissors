(() => {
  const gameType = $('#gameType').val()
  const dom = {
    p2: {
      container: $('#p2-container'),
      choice: $('#p2-container > #choice')
    },
    winner: $('#winner'),
    result: $('#result'),
    newGame: $('#new-game')
  }

  const imgPath = (imgName) => (
    `/images/game-options/${imgName}.png`
  )

  const callApi = (p1Choice = null, p2Choice = null) => (
    window.ApiProxy.call(gameType, p1Choice, p2Choice)
  )

  const showResult = (data) => {
    presentSelectedOption(data.player_1_choice)

    dom.p2.choice.attr('src', imgPath(data.player_2_choice))
    dom.winner.text(winnerLine(data.winner))
    dom.p2.container.removeClass('hidden')
    dom.result.removeClass('hidden')
  }

  const startNewGame = () => {
    presentAllOptions()
    dom.p2.container.addClass('hidden')
    dom.result.addClass('hidden')
  }

  const winnerLine = (winner) => {
    switch(winner) {
      case "Player 1":
        return "You won!"

      case "Player 2":
        return "You lost!"

      default:
        return "Draw!"
    }
  }

  const presentSelectedOption = (selectedOption) => {
     $('[id^=gameOption-]')
      .filter((_, el) => el.value !== selectedOption)
      .addClass('hidden')
  }

  const presentAllOptions = () => {
    $('[id^=gameOption-]').removeClass('hidden')
  }

  // Options callback
  $('[id^=gameOption-]').on('click', (ev) => {
    callApi(ev.target.value)
      .then(data => showResult(data))
  })

  // New game button callback
  dom.newGame.on('click', () => {
    startNewGame()
  })
})();
