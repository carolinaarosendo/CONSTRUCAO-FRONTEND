import { useEffect, useReducer, useRef, type ReactNode } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './TaskActions'; 
import { loadBeep } from '../../utils/loadBeep';
import { TaskContext } from './TaskContext';
import { useAuth } from '../AuthContext'; 
import type { TaskStateModel } from '../../models/TaskStateModel';

export function TaskContextProvider({ children }: { children: ReactNode }) {
  //useReducer com função inicializadora (Lazy Init) para reidratar o estado
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    try {
      const storageState = localStorage.getItem('state');

      if (storageState === null) return initialTaskState;

      const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

      // Retorna o estado salvo, mas força o app a voltar "parado" após o F5
      return {
        ...parsedStorageState,
        activeTask: null,
        secondsRemaining: 0,
        // Removido o formattedSecondsRemaining daqui para não dar erro no seu tipo!
      };
    } catch {
      return initialTaskState; // Proteção caso o JSON no localStorage esteja corrompido
    }
  });

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

  // 3. Gerencia o Worker, atualiza a aba e SALVA no localStorage
  useEffect(() => {
    // Salva o estado atualizado no localStorage sempre que ele mudar
    localStorage.setItem('state', JSON.stringify(state));

    // Converte os segundos brutos em formato MM:SS para o título da aba
    const totalSeconds = state?.secondsRemaining ?? 0;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    const strMinutes = String(minutes).padStart(2, '0');
    const strSeconds = String(seconds).padStart(2, '0');

    document.title = `${strMinutes}:${strSeconds} - Chronos Pomodoro`;

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