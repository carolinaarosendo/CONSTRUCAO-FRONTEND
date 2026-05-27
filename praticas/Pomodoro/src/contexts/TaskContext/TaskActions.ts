import type { TaskModel } from '../../models/TaskModel';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  COUNT_DOWN: 'COUNT_DOWN',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  RESET_STATE: 'RESET_STATE',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS',
} as const;

export type TaskActionTypes = typeof TaskActionTypes[keyof typeof TaskActionTypes];

export type TaskActionModel =
  | { type: 'START_TASK'; payload: TaskModel }
  | { type: 'COUNT_DOWN'; payload: { secondsRemaining: number } }
  | { type: 'INTERRUPT_TASK' }
  | { type: 'COMPLETE_TASK' }
  | { type: 'RESET_STATE' }
  | { type: 'CHANGE_SETTINGS'; payload: { focus: number; shortBreak: number; longBreak: number } };