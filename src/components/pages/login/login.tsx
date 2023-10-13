import { useContext, useState } from 'react';
import styles from './login.module.scss';
import { AuthContext } from 'src/context/AuthContext';
import { Input } from 'src/components';

const Login = () => {
  const { handleLogin, rememberedUser } = useContext(AuthContext);

  const [username, setUsername] = useState(rememberedUser);
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.title}>Sign in to your account</div>

        <form className={styles.form}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='email'
            placeholder='Username'
            required
            readOnly={Boolean(rememberedUser)}
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            required
          />

          <div className={styles.checkboxContainer}>
            <div className={styles.rememberBox}>
              <input
                type='checkbox'
                defaultChecked={isChecked}
                onClick={handleCheck}
              />
              <span>Remember me</span>
            </div>
          </div>

          <button
            className={styles.loginButton}
            onClick={() => handleLogin(username, isChecked)}
          >
            Login Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
