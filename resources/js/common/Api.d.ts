export default class Api implements IApi {
    private url;
    constructor(url: string);
    login(loginDTO: ILoginDTO): Promise<any>;
    /** запрос на email о сбросе пароля */
    resetPassword(email: string): Promise<any>;
    /** Обновление пароля по хэш коду */
    updatePasswordWithHash(updatePasswordDTO: IUpdatePasswordWithHash): Promise<any>;
}
interface ILoginDTO {
    email: string;
    password: string;
}
interface IUpdatePasswordWithHash {
    hash: string;
    newPassword: string;
}
export interface IApi {
    login(loginDTO: ILoginDTO): Promise<any>;
    resetPassword(email: string): Promise<any>;
    updatePasswordWithHash(updatePasswordDTO: IUpdatePasswordWithHash): Promise<any>;
}
export {};
