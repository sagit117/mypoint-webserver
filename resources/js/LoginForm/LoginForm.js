import Input from "../components/Input.js";
import Button from "../components/Button.js";
export default class LoginForm {
    rootDiv = null;
    login = null;
    password = null;
    btnOk = null;
    btnForgot = null;
    constructor(id) {
        this.rootDiv = document.querySelector("#" + id);
        if (this.rootDiv) {
            this.login = new Input(this.rootDiv, "login");
            this.password = new Input(this.rootDiv, "password");
            this.btnOk = new Button(this.rootDiv, "btnOk");
            this.btnForgot = new Button(this.rootDiv, "btnForgot");
        }
        else {
            throw new Error("rootDiv is required!");
        }
    }
}
