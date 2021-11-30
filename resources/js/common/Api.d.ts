export default class Api {
    private url;
    constructor(url: string);
    login(loginDTO: ILoginDTO): Promise<any>;
}
interface ILoginDTO {
    email: string;
    password: string;
}
export {};
