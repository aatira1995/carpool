export interface VechileDetailsEnteredResponse {
    success: boolean;
    status: number;
    message: string;
    data: {
        id: string;
        userId: string;
        vehicleNumber: string;
        vehicleName: string;
        seatsAvailable: number;
    };
}
