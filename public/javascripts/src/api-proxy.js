((exports) => {
  exports.ApiProxy = {
    call: (gameType, p1Choice, p2Choice) => {
      const body = {
        p1_choice: p1Choice,
        p2_choice: p2Choice
      };

      return fetch(`/game/${gameType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json())
      .catch(err => console.error(err));
    }
  };
})(window);
