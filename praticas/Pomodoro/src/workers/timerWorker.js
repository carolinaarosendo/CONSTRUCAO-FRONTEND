let timerId = 0;

// Usando o escopo global self diretamente (compatível com qualquer modo de inicialização)
self.onmessage = function (e) {
  if (!e || !e.data) return;

  const state = e.data;

  if (!state || !state.activeTask) {
    if (timerId) {
      clearInterval(timerId);
      timerId = 0;
    }
    return;
  }

  if (timerId) return;

  let secondsRemaining = state.secondsRemaining;

  timerId = setInterval(() => {
    secondsRemaining--;
    
    self.postMessage(secondsRemaining);

    if (secondsRemaining <= 0) {
      clearInterval(timerId);
      timerId = 0;
    }
  }, 1000);
};