let isRunning = false;

self.onmessage = function (event) {
  if (isRunning) return;

  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  // Calcula o momento exato em que a tarefa deve acabar
  const endDate = activeTask.startDate + secondsRemaining * 1000;
  
  function tick() {
    const now = Date.now();
    // Math.floor para arredondar para baixo a diferença
    let countDownSeconds = Math.floor((endDate - now) / 1000);

    if (countDownSeconds <= 0) {
      self.postMessage(0);
      isRunning = false; // Permite que o worker aceite novas mensagens no futuro
      return;
    }

    self.postMessage(countDownSeconds);

    // Agenda o próximo "tic" para daqui a 1 segundo
    setTimeout(tick, 1000);
  }

  tick();
};