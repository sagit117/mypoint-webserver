import Validator from './common/Validator.js';
import LoginForm from './LoginForm/LoginForm.js';
import Api from './common/Api.js';

const loginForm = new LoginForm("login_form", new Validator(), new Api());
console.log(loginForm);