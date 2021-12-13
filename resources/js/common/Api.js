export default class Api {
    url = "";
    constructor(url) {
        this.url = url;
    }
    async login(loginDTO) {
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
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    /** запрос на email о сбросе пароля */
    async resetPassword(email) {
        const url = this.url + `/users/reset/password/${email}`;
        try {
            const response = await fetch(url, {});
            return await prepareResponse(response);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    /** Обновление пароля по хэш коду */
    async updatePasswordWithHash(updatePasswordDTO) {
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
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
async function prepareResponse(response) {
    const isOk = response.ok;
    const code = response.status;
    const json = await response.json();
    if (isOk) {
        return Promise.resolve(json);
    }
    else {
        console.error(json);
        return Promise.reject(Object.assign(json, { code }));
    }
}
