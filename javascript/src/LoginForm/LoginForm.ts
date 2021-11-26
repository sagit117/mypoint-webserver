import Input from "../components/Input.js"

export default class LoginForm {
    private rootDiv: HTMLDivElement | null = null;
    private email: Input | null = null;
    private password: Input | null = null;

    constructor(id: string) {
        this.rootDiv = document.querySelector("#" + id) as HTMLDivElement;

        if (this.rootDiv) {
            this.email = new Input(this.rootDiv, "email");
            this.password = new Input(this.rootDiv, "password");
        }

        console.log(this.rootDiv);
    }
}