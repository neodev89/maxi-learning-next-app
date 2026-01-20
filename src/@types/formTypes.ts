import { HTMLInputTypeAttribute, ReactNode } from "react";
import { Control, UseFormHandleSubmit, UseFormSetValue } from "react-hook-form";

interface formTypeProps {
    id: string;
    type: HTMLInputTypeAttribute;
    placeholder: string;
    icon: ReactNode | undefined;
}

interface loginProps<T extends Record<string, any>> {
    control: Control<T>;
    setValue: UseFormSetValue<T>
    handleSubmit: UseFormHandleSubmit<T>;
    handleSubmitForm: () => Promise<void>;
} 

export type {
    formTypeProps,
    loginProps,
}