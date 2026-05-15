import { HistoryIcon, HouseIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';
import styles from './styles.module.css';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    return (localStorage.getItem('theme') as AvailableThemes) || 'dark';
  });

  const nextThemeIcon = { dark: <SunIcon />, light: <MoonIcon /> };

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink className={styles.menuLink} href='/home' title='Home'>
        <HouseIcon />
      </RouterLink>

      <RouterLink className={styles.menuLink} href='/history' title='Histórico'>
        <HistoryIcon />
      </RouterLink>

      <a className={styles.menuLink} href='#' onClick={handleThemeChange} title='Mudar Tema'>
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}