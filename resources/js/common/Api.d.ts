/** Класс для запросов к серверу */
export default class Api implements IApi {
    private url;
    /**
     * Конструктор
     * @param url - базовый url API сервера
     */
    constructor(url: string);
    /**
     * Отправка данных при логине
     * @param loginDTO
     * @returns
     */
    login(loginDTO: ILoginDTO): Promise<any>;
    /** запрос на email о сбросе пароля */
    resetPassword(email: string): Promise<any>;
    /** Обновление пароля по хэш коду */
    updatePasswordWithHash(updatePasswordDTO: IUpdatePasswordWithHash): Promise<any>;
}
/** DTO для логина */
interface ILoginDTO {
    email: string;
    password: string;
}
/** DTO для обновления пароля по хэш коду */
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
