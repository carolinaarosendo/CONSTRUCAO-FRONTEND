import type { TaskStateModel } from '../../models/TaskStateModel';
import { TaskActionTypes } from './TaskActions';

// Usamos a mesma lógica de tipos aqui
type TaskAction = 
  | { type: TaskActionTypes.COUNT_DOWN; payload: { secondsRemaining: number } }
  | { type: TaskActionTypes.COMPLETE_TASK };

export function taskReducer(state: TaskStateModel, action: TaskAction): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.COUNT_DOWN:
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
      };
    case TaskActionTypes.COMPLETE_TASK:
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
      };
    default:
      return state;
  }
}