import type { TaskModel } from '../../models/TaskModel'; // Certifique-se de que o caminho até o seu model está correto

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE', 
} as const;

export type TaskAction =
  /* CORREÇÃO AQUI: Substituímos o 'any' pelo modelo real TaskModel */
  | { type: typeof TaskActionTypes.START_TASK; payload: TaskModel } 
  | { type: typeof TaskActionTypes.COUNT_DOWN; payload: { secondsRemaining: number } }
  | { type: typeof TaskActionTypes.COMPLETE_TASK }
  | { type: typeof TaskActionTypes.INTERRUPT_TASK }
  | { type: typeof TaskActionTypes.RESET_STATE };