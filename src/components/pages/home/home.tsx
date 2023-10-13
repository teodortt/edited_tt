import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import styles from './home.module.scss';

const Home = () => {
  const { handleLogout, username } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <h3>Hi, {username}</h3>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
