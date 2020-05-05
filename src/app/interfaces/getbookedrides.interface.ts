export interface BookedRidesResponse {
    success: boolean;
    status: number;
    data: {
        id: string;
        vehicleId: string;
        fromLocation: string;
        toLocation: string;
        checkpoints: string;
        cost: number;
        createdOn: string;
        isActive: boolean;
        rideDate: string;
        seatsAvailable: number;
    };
}
