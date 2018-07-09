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
