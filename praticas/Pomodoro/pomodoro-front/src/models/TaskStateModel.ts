import type { TaskModel } from './TaskModel';

export interface TaskStateModel {
  tasks: TaskModel[];
  activeTask: TaskModel | null;
  secondsRemaining: number;
  currentCycle: number;
  formattedSecondsRemaining: string; // ← estava faltando
  config: {
    workTime: string | number | readonly string[] | undefined;
    focus: number;
    shortBreak: number;
    longBreak: number;
  };
}