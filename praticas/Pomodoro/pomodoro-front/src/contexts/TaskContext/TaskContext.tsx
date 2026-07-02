import {
  createContext,
  useReducer,
  useEffect,
  useRef,
  type ReactNode,
  type Dispatch,
} from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TaskActionTypes } from './TaskActions';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import type { TaskStateModel } from '../../models/TaskStateModel';
import type { TaskActionModel } from './TaskActions';

interface TaskContextType {
  state: TaskStateModel;
  dispatch: Dispatch<TaskActionModel>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export function TaskContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state');
    if (storageState === null) return initialTaskState;

    try {
      const parsed = JSON.parse(storageState) as TaskStateModel;
      return {
        ...initialTaskState,
        ...parsed,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
      };
    } catch {
      return initialTaskState;
    }
  });

  // useRef garante que sempre temos a instância atual do worker
  // sem re-disparar useEffects quando ele é recriado
  const workerRef = useRef<TimerWorkerManager>(TimerWorkerManager.getInstance());

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));

    if (state.formattedSecondsRemaining) {
      document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    }
  }, [state]);

  // Registra o handler uma única vez
  useEffect(() => {
    const worker = TimerWorkerManager.getInstance();
    workerRef.current = worker;

    worker.setOnMessage((e: MessageEvent<unknown>) => {
      const countDownSeconds = Number(e.data);
      if (isNaN(countDownSeconds)) return;

      if (countDownSeconds <= 0) {
        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });

    return () => {
      worker.terminate();
    };
  }, []);

  // Dispara/para o worker quando a activeTask muda
  useEffect(() => {
    const worker = workerRef.current;

    if (!state.activeTask) {
      worker.stop();
      return;
    }

    worker.postMessage({
      activeTask: state.activeTask,
      secondsRemaining:
        state.secondsRemaining > 0
          ? state.secondsRemaining
          : (state.config?.focus || 25) * 60,
    });
  }, [state.activeTask?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}