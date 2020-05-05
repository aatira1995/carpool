export interface LoginResponse {
    success: boolean;
    status: number;
    error: string;
    data: {
        id: string;
        name: string;
    };
}
