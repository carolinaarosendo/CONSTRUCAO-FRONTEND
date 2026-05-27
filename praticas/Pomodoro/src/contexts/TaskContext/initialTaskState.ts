import type { TaskStateModel } from '../../models/TaskStateModel';

export const initialTaskState: TaskStateModel = {
  tasks: [],
  activeTask: null,
  secondsRemaining: 0,
  currentCycle: 0,
  formattedSecondsRemaining: '00:00',
  config: {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  },
};