import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  // Mensagens para quando o cronômetro ESTÁ rodando
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por <strong>{state.config.workTime} min</strong></span>,
    shortBreakTime: <span>Descanse por <strong>{state.config.shortBreakTime} min</strong></span>,
    longBreakTime: <span>Descanso longo (recupere as energias!)</span>,
  };

  // Mensagens para quando o cronômetro ESTÁ PARADO (previsão)
  const tipsForNoActiveTask = {
    workTime: (
      <span>Próximo ciclo: foco de <strong>{state.config.workTime} min</strong></span>
    ),
    shortBreakTime: (
      <span>Próxima pausa: <strong>{state.config.shortBreakTime} min</strong></span>
    ),
    longBreakTime: <span>O próximo descanso será longo</span>,
  };

  return (
    <div className="tipsContainer">
      {/* Se tiver tarefa ativa, usa o type da tarefa atual */}
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      
      {/* Se NÃO tiver tarefa ativa, usa o tipo do próximo ciclo */}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </div>
  );
}