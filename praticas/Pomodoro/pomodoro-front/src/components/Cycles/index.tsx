import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  // Cria um array com o tamanho do ciclo atual
  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          // O index começa em 0. O primeiro ciclo é index 0 + 1 = 1.
          const cycleNumberForThisDot = index + 1; 
          const type = getNextCycleType(cycleNumberForThisDot);

          return (
            <span
              key={cycleNumberForThisDot}
              className={`${styles.cycleDot} ${styles[type]}`}
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[type]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[type]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}