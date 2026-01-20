'use client';

import styles from './style.module.sass';
import Link from 'next/link';

import { montserrat } from '../../../../font-families/fonts';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

export default function Welcome() {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className={styles.welcome}>
            {
                loading ? (
                    <>
                        <CircularProgress size={50} />
                    </>
                ) : (
                    <>
                        <div className={styles.title}>
                            <h3 className={`${montserrat.variable}`}>
                                Titolo
                            </h3>
                        </div>
                        <div className={styles.body}>
                            <Link
                                href={'/login'}
                                className={styles.buttons}
                                onClick={() => setLoading(true)}
                            >
                                Login
                            </Link>
                        </div>
                    </>
                )
            }
        </div>
    )
}