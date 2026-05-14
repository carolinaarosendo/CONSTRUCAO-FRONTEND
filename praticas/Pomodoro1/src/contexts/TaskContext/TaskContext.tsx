import { createContext, type Dispatch } from 'react';
import type { TaskStateModel } from '../../models/TaskStateModel';
import type { TaskAction } from './TaskActions'; // <--- Importa daqui

interface TaskContextType {
  state: TaskStateModel;
  dispatch: Dispatch<TaskAction>;
}

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);