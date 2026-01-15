import { ReactNode } from "react";
import style from './style.module.sass';

interface globalWrapperProps {
    children: ReactNode;
}

export default function GlobalWrapper({
    children
}: globalWrapperProps) {
    return (
        <div className={style.globalWrapperStyle}>
            <div className={style.wrapperChild}>
                {children}
            </div>
        </div>
    )
}