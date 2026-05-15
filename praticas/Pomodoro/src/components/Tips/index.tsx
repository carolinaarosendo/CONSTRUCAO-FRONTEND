import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  // Mapeamento das dicas quando há tarefa ativa
  // Mudamos workTime -> focus e shortBreakTime -> shortBreak para bater com seu state.config
  const tipsForWhenActiveTask = {
    focus: <span>Foque por {state.config.focus}min</span>,
    shortBreak: <span>Descanse por {state.config.shortBreak}min</span>,
    longBreak: <span>Descanso longo</span>,
  };

  // Mapeamento das dicas quando NÃO há tarefa ativa
  const tipsForNoActiveTask = {
    focus: (
      <span>
        Próximo ciclo é de <b>{state.config.focus}min</b>
      </span>
    ),
    shortBreak: (
      <span>Próximo descanso é de {state.config.shortBreak}min</span>
    ),
    longBreak: <span>Próximo descanso será longo</span>,
  };

  return (
    <>
      {/* Usamos o tipo da tarefa ativa ou o próximo tipo para buscar no objeto */}
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}