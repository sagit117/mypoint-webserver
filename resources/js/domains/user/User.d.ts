export default class User {
    private data;
    private token;
    constructor(userData: IUserData, token: string);
    getToken(): string;
    getData(): IUserData;
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
