import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider.jsx';
import { MainRouter } from './routers/MainRouter/index.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <MainRouter />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;