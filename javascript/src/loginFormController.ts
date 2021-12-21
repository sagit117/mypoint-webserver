import Validator from './common/Validator.js';
import LoginForm from './AuthForm/LoginForm.js';
import Api from './common/Api.js';
import { API_URL } from './common/const.js'
import Toasts from './components/Toasts.js';

new LoginForm("login_form", new Validator(), new Api(API_URL), new Toasts("toasts"));