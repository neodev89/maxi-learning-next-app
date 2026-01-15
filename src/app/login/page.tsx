import GlobalWrapper from '@/ui/components/global-wrapper/GlobalWrapper';
import style from './style.module.sass';
import Link from 'next/link';
import PageLogin from '@/ui/components/pages/pageLogin/PageLogin';

export default function Login() {
    return (
        <GlobalWrapper>
            <div className={style.login}>
                <div className={style.navigate}>
                    <Link href={'/'} className={style.buttons}>Indietro</Link>
                </div>
                <div className={style.content}>
                    <PageLogin isLogin={'sign-in'} />
                </div>
            </div>
        </GlobalWrapper>
    )
}