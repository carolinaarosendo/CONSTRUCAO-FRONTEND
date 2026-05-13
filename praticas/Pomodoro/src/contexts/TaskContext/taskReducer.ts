import type { TaskStateModel } from '../../models/TaskStateModel';
import { TaskActionTypes } from './TaskActions';
import type { TaskAction } from './TaskContext';

export function taskReducer(state: TaskStateModel, action: TaskAction): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK:
      // O TS agora sabe que action.payload existe e tem .duration
      return {
        ...state,
        activeTask: action.payload,
        secondsRemaining: action.payload.duration * 60,
        currentCycle: state.currentCycle + 1,
        tasks: [action.payload, ...state.tasks],
      };

    case TaskActionTypes.COUNT_DOWN:
      // O TS sabe que action.payload tem .secondsRemaining
      return { 
        ...state, 
        secondsRemaining: action.payload.secondsRemaining 
      };

    case TaskActionTypes.COMPLETE_TASK:
    case TaskActionTypes.INTERRUPT_TASK:
      // Nestes casos, o TS nem deixa você escrever "action.payload" 
      // porque definimos acima que eles não têm payload.
      return { 
        ...state, 
        activeTask: null, 
        secondsRemaining: 0 
      };

    default:
      return state;
  }
}