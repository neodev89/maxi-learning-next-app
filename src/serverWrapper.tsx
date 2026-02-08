import { ReactNode } from "react";

interface serverWrapType {
    children: ReactNode;
}

export default function ServerWrapper({
    children
}: serverWrapType) {
    return (
        <div>{children}</div>
    )
}