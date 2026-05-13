import { createContext, type Dispatch } from "react";
import type { TaskStateModel } from '../../models/TaskStateModel';

// Trocamos 'any' por 'unknown' para calar o ESLint
export type TaskAction = 
  | { type: 'COUNT_DOWN'; payload: { secondsRemaining: number } }
  | { type: 'COMPLETE_TASK' }
  | { type: string; payload?: unknown }; 

export type TaskContextProps = {
  state: TaskStateModel;
  dispatch: Dispatch<TaskAction>;
};

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);