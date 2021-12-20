import Validator from './common/Validator.js';
import Api from './common/Api.js';
import { API_URL } from './common/const.js'
import Toasts from './components/Toasts.js';
import ForgotForm from './AuthForm/ForgotForm.js';

const forgotForm = new ForgotForm("forgot_form", new Validator(), new Api(API_URL), new Toasts("toasts"));
// console.log(forgotForm);