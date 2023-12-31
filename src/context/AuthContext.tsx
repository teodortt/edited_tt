import { createContext, ReactNode, useState } from 'react';
import { usersData } from 'src/utils';

type Props = {
  children: ReactNode;
};

type ErrorsProps = { username: string; password: string };

type IAuthContext = {
  authenticated: boolean;
  handleAuth: (
    username: string,
    password: string,
    rememberUser: boolean
  ) => void;
  handleLogout: () => void;
  username: string;
  rememberedUser: string;
  errors: ErrorsProps;
  setErrors: (errors: ErrorsProps) => void;
};

const rememberedUser = localStorage.getItem('rememberedUser');

const initErrors = { username: '', password: '' };

const initialValue = {
  authenticated: false,
  handleAuth: () => {},
  handleLogout: () => {},
  username: '',
  rememberedUser: '',
  errors: initErrors,
  setErrors: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [username, setUsername] = useState('');
  const [remembered, setRemembered] = useState(rememberedUser);
  const [errors, setErrors] = useState(initErrors);

  const handleAuth = (
    username: string,
    password: string,
    rememberUser: boolean
  ) => {
    //check in dummyData
    if (
      usersData.some(
        (user) => user.username === username && user.password === password
      )
    ) {
      setUsername(username);

      if (rememberUser) {
        setRemembered(username);
        localStorage.setItem('rememberedUser', username);
      } else {
        setRemembered('');
        localStorage.removeItem('rememberedUser');
      }
    } else if (
      usersData.some(
        (user) => user.username === username && user.password !== password
      )
    ) {
      setErrors({ username: '', password: 'Incorrect password!' });
    } else {
      setErrors({ username: 'User not exist.', password: '' });
    }
  };

  const handleLogout = () => {
    setUsername('');
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: Boolean(username),
        handleAuth,
        handleLogout,
        username,
        rememberedUser: remembered ?? '',
        errors,
        setErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
