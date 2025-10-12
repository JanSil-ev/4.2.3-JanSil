import Search from "./search";
import Title from "./title";
import styles from './styles.module.css'
import Filter from "./filter";
import ListJod from "./listJob";

export default function JodPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title/>
                <Search/>
            </div>
            <div className={styles.content}>
                <div className={styles.leftColumn}>
                    <Filter/>
                </div>
                <div className={styles.rightColumn}>
                    <ListJod/>
                </div>
            </div>
        </div>
    );
}