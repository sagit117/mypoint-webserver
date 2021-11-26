import { IInputEventChanged } from "../components/Input.js";
export default class LoginForm {
    private rootDiv;
    private login;
    private password;
    private btnOk;
    private btnForgot;
    constructor(id: string);
    btnOkClick(): void;
    btnForgotClick(): void;
    onInputLoginHandler(event: IInputEventChanged): void;
    onInputPasswordHandler(event: IInputEventChanged): void;
}
