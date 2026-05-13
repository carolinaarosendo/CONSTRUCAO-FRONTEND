import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { AboutPomodoro } from './pages/AboutPomodoro';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';

import './styles/theme.css';
import './styles/globals.css';

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about-pomodoro/' element={<AboutPomodoro />} />
            {/* Rota 404 - sempre por último */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MessagesContainer>
    </TaskContextProvider>
  );
}