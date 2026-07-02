let timerId = null;

self.onmessage = function (e) {
  if (!e || !e.data) return;

  const state = e.data;

  // Sempre limpa o timer anterior antes de começar um novo
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  if (!state || !state.activeTask) return;

  let secondsRemaining = state.secondsRemaining;

  timerId = setInterval(() => {
    secondsRemaining--;
    self.postMessage(secondsRemaining);

    if (secondsRemaining <= 0) {
      clearInterval(timerId);
      timerId = null;
    }
  }, 1000);
};