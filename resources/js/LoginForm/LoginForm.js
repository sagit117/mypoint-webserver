import Input from "../components/Input.js";
export default class LoginForm {
    rootDiv = null;
    email = null;
    password = null;
    constructor(id) {
        this.rootDiv = document.querySelector("#" + id);
        if (this.rootDiv) {
            this.email = new Input(this.rootDiv, "email");
            this.password = new Input(this.rootDiv, "password");
        }
        console.log(this.rootDiv);
    }
}
