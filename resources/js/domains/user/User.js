export default class User {
    data;
    token = "";
    constructor(userData, token) {
        this.data = userData;
        this.token = token;
    }
    getToken() {
        return this.token;
    }
    getData() {
        return this.data;
    }
}
