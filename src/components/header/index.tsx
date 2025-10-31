import { Link } from 'react-router-dom';
import { Avatar } from '@mantine/core';
import hh from '../image/hh.png';
import styles from './styles.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={hh} alt="logo" width={30} />
        <a className={styles.logo}>.FrontEnd</a>
      </div>

      <nav className={styles.nav}>
        <Link to="/" className={`${styles.link} ${styles.active}`}>
          Вакансии FE <span className={styles.dot}></span>
        </Link>

        <button className={styles.link}>
          <Avatar radius="xl" />
          <p>Обо мне</p>
        </button>
      </nav>
    </header>
  );
};

export default Header;
