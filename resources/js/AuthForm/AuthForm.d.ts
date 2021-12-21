import { IButton } from "../components/Button.js";
import { ISpinner } from "../components/Spinner.js";
import { IToasts } from "../components/Toasts.js";
import { IInput, IInputEventChanged } from "../components/Input.js";
import { IApi } from "../common/Api.js";
import { IValidator } from "../common/Validator.js";
import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
export default class AuthForm extends DefaultHTMLComponent {
    protected login: IInput | null;
    protected btnOk: IButton | null;
    protected validator: IValidator | null;
    protected spinner: ISpinner | null;
    protected api: IApi | null;
    protected toasts: IToasts | null;
    constructor(id: string, validator: IValidator, api: IApi, toasts: IToasts);
    protected btnOkClick(): void;
    protected onInputLoginHandler(_event: IInputEventChanged): void;
}
