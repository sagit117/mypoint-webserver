import Validator from './common/Validator.js';
import LoginForm from './LoginForm/LoginForm.js';
import Api from './common/Api.js';
import { API_URL } from './common/const.js';
const loginForm = new LoginForm("login_form", new Validator(), new Api(API_URL));
console.log(loginForm);
