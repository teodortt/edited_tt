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

const user = localStorage.getItem('loggedAs');
const rememberedUser = localStorage.getItem('rememberedUser');

const initialValue = {
  authenticated: false,
  handleAuth: () => {},
  handleLogout: () => {},
  username: '',
  rememberedUser: '',
  errors: { username: '', password: '' },
  setErrors: () => {},
};

const initErrors = { username: '', password: '' };

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [username, setUsername] = useState(user);
  const [errors, setErrors] = useState(initErrors);
  const [remembered, setRemembered] = useState(rememberedUser);

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
      localStorage.setItem('loggedAs', username);
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
      setErrors({ ...errors, password: 'Incorrect password!' });
    } else {
      setErrors({ ...errors, username: 'User not exist.' });
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
        handleAuth,
        handleLogout,
        username: username ?? '',
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
