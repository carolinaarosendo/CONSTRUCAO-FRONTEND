import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js'; // Certifique-se de que este hook existe ou importe do Context direto

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Impede a página de recarregar
    
    const success = login(username, password);

    if (success) {
      alert("Login realizado com sucesso! 🎉");
      navigate('/home'); // Te manda para a tela principal
    } else {
      alert("Usuário ou senha incorretos! ❌");
    }
  }

  return (
    <div className="login-container">
      <h1>Chronos Login</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Usuário</label>
          <input 
            type="text" 
            placeholder="Seu usuário" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input 
            type="password" 
            placeholder="Sua senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Entrar</button>
      </form>

      <button className="btn-secondary">Cadastrar</button>

      <div className="links">
        <a href="#">Esqueci a senha</a>
      </div>
    </div>
  );
}