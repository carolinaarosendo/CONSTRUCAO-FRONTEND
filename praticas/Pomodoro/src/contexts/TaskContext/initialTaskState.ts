import type { TaskStateModel } from '../../models/TaskStateModel';

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  activeTask: null,
  currentCycle: 0,
  config: {
    focus: 25,       // Corrigido de workTime
    shortBreak: 5,   // Corrigido de shortBreakTime
    longBreak: 15,   // Corrigido de longBreakTime
  },
};