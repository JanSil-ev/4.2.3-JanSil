import styles from './styles.module.css';

export default function Title() {
  return (
    <div className={styles.title}>
      <h1 className={styles.h1}>Список вакансий</h1>
      <h2 className={styles.h2}>по профессии Frontend-разработчик</h2>
    </div>
  );
}
