export default class Api {
    private url: string = ""

    constructor(url: string) {
        this.url = url
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
            const isOk = response.ok;
            const code = response.status
            const json =  await response.json();

            if (isOk) {
                return Promise.resolve(json)
            } else {
                console.error(json);
                return Promise.reject(Object.assign(json, { code }))
            }
        } catch (err: any) {
            console.error("url error: " + err?.message);
            return Promise.reject(err)
        }
    }
}

interface ILoginDTO {
    email: string;
    password: string;
}