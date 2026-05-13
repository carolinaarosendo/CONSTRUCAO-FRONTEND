import { useEffect, useReducer, useRef, type ReactNode } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TaskContext } from './TaskContext';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './TaskActions';
import { loadBeep } from '../../utils/loadBeep';

export function TaskContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const worker = TimerWorkerManager.getInstance();

  useEffect(() => {
    worker.onmessage((e) => {
      const countDownSeconds = e.data;
      if (countDownSeconds <= 0) {
        if (playBeepRef.current) playBeepRef.current();
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

    if (playBeepRef.current === null) {
      const play = loadBeep();
      playBeepRef.current = play;
      play(); // Destrava áudio
    }
    worker.postMessage(state);
  }, [state.activeTask, worker]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}