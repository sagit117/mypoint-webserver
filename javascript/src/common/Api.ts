/** Класс для запросов к серверу */
export default class Api implements IApi {
    private url: string = "";

    /**
     * Конструктор
     * @param url - базовый url API сервера
     */
    constructor(url: string) {
        this.url = url;
    }

    /**
     * Отправка данных при логине
     * @param loginDTO 
     * @returns 
     */
    public async login(loginDTO: ILoginDTO): Promise<any> {
        const url = this.url + "/users/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(loginDTO)
            });
            return await prepareResponse(response);
        } catch (err: any) {
            return Promise.reject(err);
        }
    }

    /** запрос на email о сбросе пароля */
    public async resetPassword(email: string): Promise<any> {
        const url = this.url + `/users/reset/password/${email}`;

        try {
            const response = await fetch(url, {});
            return await prepareResponse(response);
        } catch (err: any) {
            return Promise.reject(err);
        }
    }

    /** Обновление пароля по хэш коду */
    public async updatePasswordWithHash(updatePasswordDTO: IUpdatePasswordWithHash): Promise<any> {
        const url = this.url + `/users/update/password/hash/${updatePasswordDTO.hash}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(updatePasswordDTO)
            });
            return await prepareResponse(response);
        } catch (err: any) {
            return Promise.reject(err);
        }
    }
}

/**
 * Общая функция для преобразования ответа сервера в JSON
 * @param response - ответ сервера
 * @returns 
 */
async function prepareResponse(response: Response): Promise<any> {
    const isOk = response.ok;
    const code = response.status;
    const json = await response.json();

    if (isOk) {
        return Promise.resolve(json);
    } else {
        console.error(json);
        return Promise.reject(Object.assign(json, { code }));
    }
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