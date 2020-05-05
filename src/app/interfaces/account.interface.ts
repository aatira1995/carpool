export interface ProfileResponse {
    success: boolean;
    status: number;
    data: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
}
