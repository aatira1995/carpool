export interface CreateRideResponse {
    success: boolean;
    status: number;
    message: string;
    data: {
        id: string;
        vehicleId: string;
        fromLocation: string;
        toLocation: string;
        checkpoints: string;
        seatsAvailable: number;
        cost: number;
        isActive: boolean;
        rideDate: string;
        createdOn: string;
    };
}
