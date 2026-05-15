import { Timer } from 'lucide-react';
import styles from './styles.module.css';
// Se você usa o Link do react-router-dom para voltar para a home ao clicar:
import { Link } from 'react-router-dom'; 

export function Logo() {
  return (
    <Link to="/" className={styles.logoLink}>
      <Timer className={styles.logoIcon} size={22} />
      <span className={styles.logoText}>
        Chronos<span className={styles.logoHighlight}>Pomodoro</span>
      </span>
    </Link>
  );
}