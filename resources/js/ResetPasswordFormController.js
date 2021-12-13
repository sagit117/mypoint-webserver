import Validator from './common/Validator.js';
import Api from './common/Api.js';
import { API_URL } from './common/const.js';
import Toasts from './components/Toasts.js';
import ResetPasswordForm from './AuthForm/ResetPasswordForm.js';
const resetPassword = new ResetPasswordForm("reset_password_form", new Validator(), new Api(API_URL), new Toasts("toasts"));
console.log(resetPassword);
