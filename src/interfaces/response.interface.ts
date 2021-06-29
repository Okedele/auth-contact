export interface IResponse {
    status: string;
    message: string;
    data?: Record<string, any> | string | null;
}