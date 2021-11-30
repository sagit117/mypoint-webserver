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
            console.log(response) // todo доделать проверку
            return await response.json();
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