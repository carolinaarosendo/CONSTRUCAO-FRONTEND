import { useEffect, useReducer, useRef, type ReactNode } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TaskContext } from './TaskContext';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './TaskActions'; // Verifique se é TaskActions ou taskActions
import { loadBeep } from '../../utils/loadBeep';

export function TaskContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  
  // Passo 2: useRef para persistir a função de áudio entre renders
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  useEffect(() => {
    worker.onmessage(e => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        // Passo 4: Tocar no fim do ciclo
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }
        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
        worker.terminate();
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });
  }, [worker]);

  // Efeito para gerenciar o Worker
  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
      return;
    }
    worker.postMessage(state);
  }, [worker, state.activeTask]);

  // Passo 3: useEffect para carregar o áudio (Safari Friendly)
  useEffect(() => {
    if (!state.activeTask) {
      playBeepRef.current = null;
      return;
    }

    if (playBeepRef.current === null) {
      const play = loadBeep();
      playBeepRef.current = play;
      // Primeiro play para destravar o autoplay do navegador
      play();
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}