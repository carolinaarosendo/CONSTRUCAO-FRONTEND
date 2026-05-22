import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { showMessage } from '../../adapters/showMessage'; // Importando o adaptador de mensagens
import styles from './styles.module.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    showMessage.dismiss(); // Limpa mensagens anteriores

    const success = login(username, password);
    if (success) {
      navigate('/home');
    } else {
      showMessage.error('Usuário ou senha inválidos! (Use demo / 123)');
    }
  }

  // Função simulada para o clique no link de cadastro
  function handleRegisterSimulate(e: React.MouseEvent) {
    e.preventDefault();
    showMessage.dismiss();
    showMessage.info('Fluxo de cadastro ainda será implementado'); // Feedback exigido pelo professor
  }

  // Função simulada para o clique no link de recuperar senha
  function handleForgotPasswordSimulate(e: React.MouseEvent) {
    e.preventDefault();
    showMessage.dismiss();
    showMessage.info('Fluxo de recuperação de senha ainda será implementado'); // Feedback exigido pelo professor
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chronos Login</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Seu usuário"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
          />
        </div>

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        <div className={styles.footerLinks}>
          {/* Conectando os eventos de clique aos links correspondentes */}
          <a href="#" className={styles.link} onClick={handleRegisterSimulate}>
            Cadastrar-se
          </a>
          <a href="#" className={styles.link} onClick={handleForgotPasswordSimulate}>
            Esqueci a senha
          </a>
        </div>
      </form>
    </div>
  );
}