import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Volta para o login ao sair
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#FCD8AF' // Cor de fundo da tua paleta
    }}>
      <div className="login-container"> {/* Reutiliza o estilo do teu container branco */}
        <h1 style={{ color: '#045071' }}>Bem-vindo ao Chronos!</h1>
        <p style={{ color: '#045071', marginBottom: '20px' }}>Login efetuado com sucesso.</p>
        
        <button 
          onClick={handleLogout} 
          className="btn-primary" 
          style={{ backgroundColor: '#FD6084' }} // Rosa da tua paleta
        >
          Sair do Sistema
        </button>
      </div>
    </div>
  );
}