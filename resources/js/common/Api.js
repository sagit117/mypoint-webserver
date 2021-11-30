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
            console.log(response);
            return await response.json();
        }
        catch (err) {
            console.error("url error: " + err?.message);
            return Promise.reject(err);
        }
    }
}
