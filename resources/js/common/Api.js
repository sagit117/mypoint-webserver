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
        catch (err) {
            console.error(`${url} error: ` + err?.message);
            return Promise.reject(err);
        }
    }
    async resetPassword(email) {
        const url = this.url + `/users/reset/password/${email}`;
        try {
            const response = await fetch(url, {});
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
        catch (err) {
            console.error(`${url} error: ` + err?.message);
            return Promise.reject(err);
        }
    }
}
