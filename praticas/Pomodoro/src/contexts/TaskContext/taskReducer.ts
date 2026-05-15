import type { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState'; // Importando o estado inicial para o Reset
import { TaskActionTypes, type TaskAction } from './TaskActions';

export function taskReducer(state: TaskStateModel, action: TaskAction): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK:
      return {
        ...state,
        activeTask: action.payload,
        secondsRemaining: action.payload.duration * 60,
        currentCycle: state.currentCycle + 1,
        tasks: [action.payload, ...state.tasks],
      };

    case TaskActionTypes.COUNT_DOWN:
      return { 
        ...state, 
        secondsRemaining: action.payload.secondsRemaining 
      };

    case TaskActionTypes.INTERRUPT_TASK:
      return { 
        ...state, 
        activeTask: null, 
        secondsRemaining: 0,
        // Mapeia a lista e injeta a data de interrupção na tarefa que estava rodando
        tasks: state.tasks.map(task => {
          if (state.activeTask && task.id === state.activeTask.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };

    case TaskActionTypes.COMPLETE_TASK:
      return { 
        ...state, 
        activeTask: null, 
        secondsRemaining: 0,
        // Mapeia a lista e injeta a data de conclusão na tarefa que estava rodando
        tasks: state.tasks.map(task => {
          if (state.activeTask && task.id === state.activeTask.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };

    // NOVA CASE DA AULA: Reseta o estado global para os valores padrão
    case TaskActionTypes.RESET_STATE:
      return { ...initialTaskState };

    default:
      return state;
  }
}