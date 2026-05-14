import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // Importe do react-router v7
import styles from './styles.module.css'; // Importe do CSS Module

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    // Busca tema salvo ou define 'dark' como padrão
    const storageTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storageTheme;
  });

  // Mapeamento de ícone baseado no tema ATUAL
  const currentThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  // Função que alterna o tema
  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault(); // Impede o link '#' de rolar a página

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  // Efeito que aplica o tema no HTML e salva no Storage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      {/* 🟢 Trocado <a> por <Link> para navegação SPA na Home */}
      <Link
        className={styles.menuLink}
        to='/home' // Como temos login, a home protegida é /home
        aria-label='Ir para a Home'
        title='Ir para a Home'
      >
        <HouseIcon />
      </Link>

      {/* Histórico - Mantido como <a> por enquanto */}
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Ver Histórico'
        title='Ver Histórico'
      >
        <HistoryIcon />
      </a>

      {/* Configurações - Mantido como <a> por enquanto */}
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </a>

      {/* Botão de Mudar Tema - Mantido como <a> para usar o clique */}
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Mudar Tema'
        title='Mudar Tema'
        onClick={handleThemeChange} // Lógica de clique reativada
      >
        {currentThemeIcon[theme]} {/* Mostra Sun ou Moon */}
      </a>
    </nav>
  );
}