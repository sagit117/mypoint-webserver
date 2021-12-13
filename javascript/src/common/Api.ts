export default class Api {
    private url: string = "";

    constructor(url: string) {
        this.url = url;
    }

    public async login(loginDTO: ILoginDTO) {
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
    public async resetPassword(email: string) {
        const url = this.url + `/users/reset/password/${email}`;

        try {
            const response = await fetch(url, {});
            return await prepareResponse(response);
        } catch (err: any) {
            return Promise.reject(err);
        }
    }

    /** Обновление пароля по хэш коду */
    public async updatePasswordWithHash(updatePasswordDTO: IUpdatePasswordWithHash) {
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

async function prepareResponse(response:Response): Promise<any> {
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

interface ILoginDTO {
    email: string;
    password: string;
}

interface IUpdatePasswordWithHash {
    hash: string;
    newPassword: string;
}