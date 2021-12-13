export default class Api {
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
export {};
