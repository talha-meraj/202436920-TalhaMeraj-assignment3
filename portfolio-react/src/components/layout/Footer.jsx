import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.siteFooter}>
            <p>&copy; {new Date().getFullYear()} Talha Meraj</p>
        </footer>
    );
}
