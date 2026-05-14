import type { TaskModel } from '../../models/TaskModel';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
} as const;

export type TaskAction = 
  | { type: typeof TaskActionTypes.START_TASK; payload: TaskModel }
  | { type: typeof TaskActionTypes.COUNT_DOWN; payload: { secondsRemaining: number } }
  | { type: typeof TaskActionTypes.COMPLETE_TASK }
  | { type: typeof TaskActionTypes.INTERRUPT_TASK };