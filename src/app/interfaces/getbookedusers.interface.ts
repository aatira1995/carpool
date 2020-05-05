export interface BookedUsersResponse {
    status: number;
    success: boolean;
    data: Array<Value>;
}

export class Value {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    createdOn: string;
    address: string;
}
