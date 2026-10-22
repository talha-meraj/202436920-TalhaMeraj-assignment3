import styles from './Hero.module.css';
export default function Hero() {
    return (
        <header className={styles.heroBanner}>
            <div className={styles.heroBoxContainer}>
                <h1 className={styles.heroTitle}>Talha Meraj</h1>
            </div>
            <p className={styles.heroSubtag}>Computer Science Student @ KFUPM</p>
        </header>
    );
}