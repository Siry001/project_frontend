import Cookies from "js-cookie";

export function setToken(token) {
    Cookies.set("token", token, {secure: true})
}

export function getToken() {
    return Cookies.get("token")
}

export function deleteToken() {
    Cookies.remove("token")
}