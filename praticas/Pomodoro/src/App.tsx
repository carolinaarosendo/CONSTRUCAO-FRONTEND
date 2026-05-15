import { AuthContextProvider } from './contexts/AuthContext';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';
import { MainRouter } from './routers/MainRouter';

import './styles/theme.css';
import './styles/globals.css';

export function App() {
  return (
    <AuthContextProvider>
      {/* Verifique se o nome aqui é EXATAMENTE o que você exportou */}
      <TaskContextProvider>
        <MessagesContainer>
          <MainRouter />
        </MessagesContainer>
      </TaskContextProvider>
    </AuthContextProvider>
  );
}