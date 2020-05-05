export class BookingResponse {
    success: boolean;
    status: number;
    message: string;
    data: {
        id: string;
        userId: string;
        rideId: string;
        createdOn: string;
    };
}
