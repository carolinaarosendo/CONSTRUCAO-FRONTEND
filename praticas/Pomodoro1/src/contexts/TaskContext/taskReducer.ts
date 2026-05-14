import type { TaskStateModel } from '../../models/TaskStateModel';
import { TaskActionTypes, type TaskAction } from './TaskActions';


export function taskReducer(state: TaskStateModel, action: TaskAction): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK:
      return {
        ...state,
        activeTask: action.payload,
        secondsRemaining: action.payload.duration * 60, // Se seu model usa duration
        currentCycle: state.currentCycle + 1,
        tasks: [action.payload, ...state.tasks],
      };

    case TaskActionTypes.COUNT_DOWN:
      return { 
        ...state, 
        secondsRemaining: action.payload.secondsRemaining 
      };

    case TaskActionTypes.COMPLETE_TASK:
    case TaskActionTypes.INTERRUPT_TASK:
      return { 
        ...state, 
        activeTask: null, 
        secondsRemaining: 0 
      };

    default:
      return state;
  }
}