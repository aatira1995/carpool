export interface OfferedRidesResponse {
    success: boolean;
    status: number;
    data: Array<Value>;
}

export class Value {
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
}
