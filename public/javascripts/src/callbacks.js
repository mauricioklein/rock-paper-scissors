(() => {
  const gameType = $('#gameType').val()
  const elements = {
    optionsBar: $('#optionsBar'),
    result: {
      container: $('#result'),
      player1Choice: $('#result > #player-1-choice'),
      player2Choice: $('#result > #player-2-choice'),
      winner: $('#result > #winner')
    }
  }

  const callApi = (p1Choice = null, p2Choice = null) => (
    window.ApiProxy.call(gameType, p1Choice, p2Choice)
  )

  const showResult = (data) => {
    elements.result.player1Choice.text(data.player_1_choice)
    elements.result.player2Choice.text(data.player_2_choice)
    elements.result.winner.text(data.winner)
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
