// O 'type' aqui é obrigatório na sua configuração
import type { TaskModel } from './TaskModel';

export interface TaskStateModel {
  tasks: TaskModel[];
  activeTask: TaskModel | null;
  currentCycle: number;
  secondsRemaining: number;
  config: {
    focus: number;
    shortBreak: number;
    longBreak: number;
  };
}