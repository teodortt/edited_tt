import { SyntheticEvent, useContext, useState } from 'react';
import styles from './login.module.scss';
import { AuthContext } from 'src/context/AuthContext';
import { Input } from 'src/components';

const Login = () => {
  const initErrors = { username: '', password: '' };
  const { handleAuth, rememberedUser } = useContext(AuthContext);
  const [username, setUsername] = useState(rememberedUser);
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState(initErrors);

  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault();

    if (validateForm()) {
      handleAuth(username, isChecked);
    }
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const validateForm = () => {
    setErrors(initErrors);

    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    const isValidUserName = emailRegex.test(username);
    const isValidPassword = passwordRegex.test(password);

    setErrors({
      username: !isValidUserName ? 'Please enter a valid email address.' : '',
      password: !isValidPassword
        ? 'Password must be at least 6 characters long and contain at least one letter and one digit.'
        : '',
    });

    return isValidUserName && isValidPassword;
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.title}>Sign in to your account</div>

        <form className={styles.form} onSubmit={handleLogin}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='email'
            placeholder='Username'
            required
            readOnly={Boolean(rememberedUser)}
            autoComplete='new-password'
          />
          <span className={styles.error}>{errors.username}</span>

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            required
            autoComplete='new-password'
          />
          <span className={styles.error}>{errors.password}</span>

          <div className={styles.checkboxContainer}>
            <div className={styles.rememberBox}>
              <input
                type='checkbox'
                defaultChecked={isChecked}
                onClick={handleCheck}
              />
              <div>Remember me</div>
            </div>
          </div>

          <button className={styles.loginButton} type='submit'>
            Login Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
