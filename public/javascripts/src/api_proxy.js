class ApiProxy {
  static call(gameType, p1Choice = null, p2Choice = null) {
    /* eslint camelcase: off */
    const body = {
      p1_choice: p1Choice,
      p2_choice: p2Choice
    }

    return fetch(`/game/${gameType}/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  }

  static gameDescription(gameType) {
    return fetch(`/game/${gameType}/description`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
  }
}

Object.freeze(ApiProxy)

module.exports = ApiProxy
