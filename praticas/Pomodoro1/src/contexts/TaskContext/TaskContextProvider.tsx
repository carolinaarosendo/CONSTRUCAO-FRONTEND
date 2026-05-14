import { useEffect, useReducer, useRef, type ReactNode } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './TaskActions'; 
import { loadBeep } from '../../utils/loadBeep';
import { TaskContext } from './TaskContext';
import { useAuth } from '../AuthContext';

export function TaskContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const { isAuthenticated } = useAuth(); // Pegamos o estado de autenticação
  
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const worker = TimerWorkerManager.getInstance();

  // NOVO: Se o usuário deslogar, paramos o worker e resetamos o áudio
  useEffect(() => {
    if (!isAuthenticated) {
      worker.terminate();
      playBeepRef.current = null;
      // Opcional: dispatch um comando para resetar o state das tarefas
    }
  }, [isAuthenticated, worker]);

  useEffect(() => {
    worker.onmessage(e => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
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

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
      return;
    }
    worker.postMessage(state);
  }, [worker, state.activeTask]);

  useEffect(() => {
    if (!state.activeTask) {
      playBeepRef.current = null;
      return;
    }

    if (playBeepRef.current === null) {
      const play = loadBeep();
      playBeepRef.current = play;
      play();
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}