import { createContext, ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  handleLogin: (username: string, rememberUser: boolean) => void;
  handleLogout: () => void;
  username: string;
  rememberedUser: string;
};

const user = localStorage.getItem('loggedAs');
const rememberedUser = localStorage.getItem('rememberedUser');

const initialValue = {
  authenticated: false,
  handleLogin: () => {},
  handleLogout: () => {},
  username: '',
  rememberedUser: '',
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [username, setUsername] = useState(user);

  const handleLogin = (username: string, rememberUser: boolean) => {
    setUsername(username);
    localStorage.setItem('loggedAs', username);
    if (rememberUser) {
      localStorage.setItem('rememberedUser', username);
    } else {
      localStorage.removeItem('rememberedUser');
    }
  };

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('loggedAs');
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: Boolean(username),
        handleLogin,
        handleLogout,
        username: username ?? '',
        rememberedUser: rememberedUser ?? '',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
