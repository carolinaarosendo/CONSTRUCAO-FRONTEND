import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function CountDown() {
  const { state } = useTaskContext();

  // 🌟 PROTEÇÃO: Se por algum motivo o estado global falhar ou sumir temporariamente, 
  // o componente não quebra a tela com "undefined" e assume o tempo padrão.
  if (!state) {
    return <div className={styles.container}>25:00</div>;
  }

  // Se o professor já guardou a string formatada perfeita ("25:00", "24:59"),
  // nós mostramos ela direto. Caso contrário, calculamos via segundos restantes.
  let timeDisplay = state.formattedSecondsRemaining;

  if (!timeDisplay || timeDisplay.includes('NaN')) {
    const totalSeconds = state.secondsRemaining > 0 ? state.secondsRemaining : 25 * 60;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <div className={styles.container}>
      {timeDisplay}
    </div>
  );
}