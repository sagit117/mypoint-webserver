import Button from "../components/Button.js";
import Spinner from "../components/spinner.js";
import Toasts from "../components/Toasts.js";
import Input, { IInputEventChanged } from "../components/Input.js";
import Api from "../common/Api.js";
import Validator from "../common/Validator.js";
export default class AuthForm {
    protected rootDiv: HTMLDivElement | null;
    protected login: Input | null;
    protected btnOk: Button | null;
    protected validator: Validator | null;
    protected spinner: Spinner | null;
    protected api: Api | null;
    protected toasts: Toasts | null;
    constructor(id: string, validator: Validator, api: Api, toasts: Toasts);
    protected btnOkClick(): void;
    protected onInputLoginHandler(_event: IInputEventChanged): void;
}
