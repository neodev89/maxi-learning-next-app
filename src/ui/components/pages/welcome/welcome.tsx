import styles from './style.module.sass';
import Link from 'next/link';
import { montserrat } from '../../../../font-families/fonts';

export default function Welcome() {
    return (
        <div className={styles.welcome}>
            <div className={styles.title}>
                <h3 className={`${montserrat.variable}`}>
                    Titolo
                </h3>
            </div>
            <div className={styles.body}>
                <Link href={'/login'} className={styles.buttons}>Login</Link>
            </div>
        </div>
    )
}