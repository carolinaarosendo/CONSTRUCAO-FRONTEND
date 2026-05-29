import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  
  const nextCycle = state?.currentCycle ? getNextCycle(state.currentCycle) : 0;
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForWhenActiveTask: Record<string, React.ReactNode> = {
    focus: <span>Foque por {state?.config?.focus}min</span>,
    shortBreak: <span>Descanse por {state?.config?.shortBreak}min</span>,
    longBreak: <span>Descanso longo</span>,
  };

  const tipsForNoActiveTask: Record<string, React.ReactNode> = {
    focus: (
      <span>
        Próximo ciclo é de <b>{state?.config?.focus}min</b>
      </span>
    ),
    shortBreak: (
      <span>Próximo descanso é de {state?.config?.shortBreak}min</span>
    ),
    longBreak: <span>Próximo descanso será longo</span>,
  };

  const activeType = state?.activeTask?.type ?? '';

  return (
    <>
      {!!state?.activeTask && tipsForWhenActiveTask[activeType]}
      {!state?.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}