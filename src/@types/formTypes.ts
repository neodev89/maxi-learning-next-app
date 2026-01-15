import { HTMLInputTypeAttribute, ReactNode } from "react";

interface formTypeProps {
    id: string;
    type: HTMLInputTypeAttribute;
    placeholder: string;
    icon: ReactNode | undefined;
}

export type {
    formTypeProps
}