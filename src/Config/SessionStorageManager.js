
export default class SessionStorageManager {
    static setUser(userObj) {
        sessionStorage.setItem("user", JSON.stringify(userObj));
    }

    static clearSessionStorage() {
        sessionStorage.clear();
    }

    static removeUser() {
        sessionStorage.removeItem("user");
    }

    static removeRoutes() {
        sessionStorage.removeItem("routes");
    }

    static getUser() {
        return JSON.parse(sessionStorage.getItem("user"));
    }

}