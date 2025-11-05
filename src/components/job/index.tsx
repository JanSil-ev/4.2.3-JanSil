import ListJod from './listJob';
import Search from './Search';
import Skills from './skills';
import Title from './title';
import styles from './styles.module.css';

export default function JodPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title />
        <Search />
      </div>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <Skills />
        </div>
        <div className={styles.rightColumn}>
          <ListJod />
        </div>
      </div>
    </div>
  );
}
