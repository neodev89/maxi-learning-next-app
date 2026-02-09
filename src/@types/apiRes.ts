export interface APIResponse<T> {
    success: boolean;
    data: T;
    status: number;
    message?: string;
    error?: any;
}