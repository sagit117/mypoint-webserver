// todo
export default class User {
    private data: IUserData;
    private token: string = "";

    constructor(userData: IUserData, token: string) {
        this.data = userData;
        this.token = token;
    }

    public getToken() {
        return this.token;
    }

    public getData() {
        return this.data;
    }
}

export interface IUserData {
    id: Object;
    email: string;
    password: string;
    fullName: string; 
    zipCode: number;
    address: string;
    isBlocked: boolean;
    isNeedsPassword: boolean;
    isConfirmEmail: boolean;
    dateTimeAtCreation: number;
    roles: Array<string>;
    hashCode: string;
}