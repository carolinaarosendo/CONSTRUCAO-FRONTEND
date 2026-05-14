import { useEffect, useReducer, useRef, type ReactNode } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './TaskActions'; 
import { loadBeep } from '../../utils/loadBeep';
import { TaskContext } from './TaskContext';
import { useAuth } from '../AuthContext'; // Importe da pasta, como configuramos antes

export function TaskContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const { isAuthenticated } = useAuth(); 
  
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const worker = TimerWorkerManager.getInstance();

  // 1. Se o usuário deslogar, paramos tudo
  useEffect(() => {
    if (!isAuthenticated) {
      worker.terminate();
      playBeepRef.current = null;
    }
  }, [isAuthenticated, worker]);

  // 2. Escuta o Worker
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

  // 3. Gerencia o envio de mensagens para o Worker
  // Adicionado 'state' nas dependências para o cronômetro reagir a mudanças
  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
      return;
    }
    worker.postMessage(state);
  }, [worker, state.activeTask, state]); 

  // 4. Gerencia o Áudio (Beep)
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