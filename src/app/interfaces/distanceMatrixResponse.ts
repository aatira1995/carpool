export class DistanceMatrixResponse {
    destination_addresses: string;
    origin_addresses: string;
    rows: {
        0: {
            elements: {
                0: {
                    distance: {
                        text: string;
                        value: number;
                    };
                    duration: {
                        text: string;
                        value: number;
                    }
                }
            }
        }
    };
}
