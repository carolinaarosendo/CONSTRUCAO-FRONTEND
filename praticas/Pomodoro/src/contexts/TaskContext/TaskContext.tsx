import { createContext } from 'react';
import { initialTaskState } from './initialTaskState';
// CORREÇÃO: Adicionado mais um nível de subida ( ../../ )
import type { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const initialContextValue: TaskContextProps = {
  state: initialTaskState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);