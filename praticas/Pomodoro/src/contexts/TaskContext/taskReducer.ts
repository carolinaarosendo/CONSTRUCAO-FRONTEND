import type { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';
import { TaskActionTypes, type TaskActionModel } from './TaskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    // ... os outros cases (START_TASK, INTERRUPT_TASK, etc) continuam aqui exatamente iguais

    case TaskActionTypes.RESET_STATE: {
      return { ...initialTaskState };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
      };
    }
    
    // NOVO CASE ADICIONADO:
    case TaskActionTypes.CHANGE_SETTINGS: {
      return { 
        ...state, 
        config: { ...action.payload } 
      };
    }
  }

  return state;
}