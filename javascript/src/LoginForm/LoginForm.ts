import Input from "../components/Input.js"
import Button from "../components/Button.js"

export default class LoginForm {
    private rootDiv: HTMLDivElement | null = null;
    private login: Input | null = null;
    private password: Input | null = null;
    private btnOk: Button | null = null;
    private btnForgot: Button | null = null;

    constructor(id: string) {
        this.rootDiv = document.querySelector("#" + id) as HTMLDivElement;

        if (this.rootDiv) {
            this.login = new Input(this.rootDiv, "login");
            this.password = new Input(this.rootDiv, "password");

            this.btnOk = new Button(this.rootDiv, "btnOk");
            this.btnForgot = new Button(this.rootDiv, "btnForgot");
        } else {
            throw new Error("rootDiv is required!")
        }
    }
}