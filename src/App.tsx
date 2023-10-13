import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { Login, Home } from './components';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Login />;

  return <Home />;
};

function App() {
  return (
    <AuthProvider>
      <PrivateRoutes />
    </AuthProvider>
  );
}

export default App;
