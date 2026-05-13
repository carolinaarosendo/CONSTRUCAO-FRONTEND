import { createContext, type Dispatch } from "react";
import type { TaskStateModel } from '../../models/TaskStateModel';

// Definimos exatamente quais formatos uma ação pode ter
type TaskAction = 
  | { type: 'COUNT_DOWN'; payload: { secondsRemaining: number } }
  | { type: 'COMPLETE_TASK' }
  | { type: string; payload?: any }; // Fallback para outras ações

export type TaskContextProps = {
  state: TaskStateModel;
  dispatch: Dispatch<TaskAction>;
};

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);