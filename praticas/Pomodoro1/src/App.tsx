import { BrowserRouter } from 'react-router'; // Use 'react-router' ou 'react-router-dom' conforme sua versão
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';
import { MainRouter } from './routers/MainRouter';
import { AuthContextProvider } from './contexts/AuthContext/AuthContext';

import './styles/theme.css';
import './styles/globals.css';

export function App() {
  return (
    // 1. O AuthContext fica por fora para gerir o login de toda a aplicação
    <AuthContextProvider>
      
      {/* 2. O TaskContext fica por dentro, pois as tarefas só existem se houver usuário */}
      <TaskContextProvider>
        
        {/* 3. Container de mensagens (Toasts) disponível para login e tarefas */}
        <MessagesContainer>
          
          {/* 4. O Router envolve toda a navegação */}
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
          
        </MessagesContainer>
      </TaskContextProvider>
      
    </AuthContextProvider>
  );
}

export default App;