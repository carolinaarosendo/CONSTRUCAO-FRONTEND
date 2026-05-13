import type { TaskStateModel } from '../../models/TaskStateModel';
import { TaskActionTypes } from './TaskActions';

export function taskReducer(state: TaskStateModel, action: any): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.COUNT_DOWN:
      return { ...state, secondsRemaining: action.payload.secondsRemaining };
    case TaskActionTypes.COMPLETE_TASK:
      return { ...state, activeTask: null, secondsRemaining: 0 };
    default:
      return state;
  }
}