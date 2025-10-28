export default function isLogged(){
    return (localStorage.getItem("access_token") !== null || sessionStorage.getItem("access_token") !== null);
}