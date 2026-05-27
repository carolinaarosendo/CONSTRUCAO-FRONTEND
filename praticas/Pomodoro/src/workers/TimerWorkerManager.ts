export class TimerWorkerManager {
  private worker: Worker;
  private static instance: TimerWorkerManager | null = null;

  private constructor() {
    this.worker = new Worker(
      new URL('./timerWorker.js', import.meta.url),
      { type: 'module' }
    );
  }

  static getInstance(): TimerWorkerManager {
    if (!TimerWorkerManager.instance) {
      TimerWorkerManager.instance = new TimerWorkerManager();
    }
    return TimerWorkerManager.instance;
  }

  postMessage(message: unknown): void {
    this.worker.postMessage(message);
  }

  setOnMessage(cb: (e: MessageEvent<unknown>) => void): void {
    this.worker.onmessage = cb;
  }

  // Para o timer sem destruir o worker
  stop(): void {
    this.worker.postMessage({ activeTask: null });
  }

  terminate(): void {
    this.worker.terminate();
    TimerWorkerManager.instance = null;
  }
}