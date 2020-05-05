export interface ShowRideResponse {
  success: boolean;
  status: number;
  error: string;
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
