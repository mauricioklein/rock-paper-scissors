class ApiProxy {
  static call(gameType, p1Choice = null, p2Choice = null) {
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
}

Object.freeze(ApiProxy)

module.exports = ApiProxy
