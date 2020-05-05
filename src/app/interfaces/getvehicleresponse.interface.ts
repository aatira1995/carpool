
export interface VehicleDetailsResponse {
    success: boolean;
    status: number;
    data: Array<Value>;
}

export class Value {
    id: string;
    userId: string;
    vehicleNumber: string;
    vehicleName: string;
    seatsAvailable: number;
}
