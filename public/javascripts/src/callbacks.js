(() => {
  const gameType = $('#gameType').val()
  const elements = {
    optionsBar: $('#optionsBar'),
    result: {
      container: $('#result'),
      player1Choice: $('.scorebox > #player-1-choice'),
      player2Choice: $('.scorebox > #player-2-choice'),
      winner: $('.scorebox > #winner')
    }
  }

  const callApi = (p1Choice = null, p2Choice = null) => (
    window.ApiProxy.call(gameType, p1Choice, p2Choice)
  )

  const showResult = (data) => {
    elements.result.player1Choice.text(`You choose ${data.player_1_choice}`)
    elements.result.player2Choice.text(`The oponent choose ${data.player_2_choice}`)

    switch(data.winner) {
      case "Player 1":
        elements.result.winner.text("You won \\o/")
        break

      case "Player 2":
        elements.result.winner.text("You lost :(")
        break

      default:
        elements.result.winner.text("It's a draw")
        break
    }

    elements.optionsBar.addClass('hidden')
    elements.result.container.removeClass('hidden')
  }

  const startNewGame = () => {
    elements.optionsBar.removeClass('hidden')
    elements.result.container.addClass('hidden')
  }

  // Options callback
  $('[id^=gameOption-]').on('click', (ev) => {
    callApi(ev.target.value)
      .then(data => showResult(data))
  })

  // New game button callback
  $('#newGame').on('click', () => {
    startNewGame()
  })
})();
