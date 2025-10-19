import doesPasswordMatch from "./utils/doesPasswordMatch.js";
import doesUserExist from "./utils/doesUserExist.js";
import users from "./constants/users.js";
import createLocalStorageData from "./utils/createLocalStorageData.js";
import createLoginSession from "./utils/createLoginSession.js";

const hidePasswordElement = document.querySelector("#hide-password");
const loginForm = document.querySelector("#login-form");
const passwordInput = document.querySelector("#password");

let isPasswordVisible = false;

hidePasswordElement.addEventListener("click",()=>{
    isPasswordVisible = !isPasswordVisible;

    if(isPasswordVisible){
        hidePasswordElement.src = `${location.origin}/icons/visible.png`;
        passwordInput.setAttribute("type","text");
    } else {
        hidePasswordElement.src = `${location.origin}/icons/invisible.png`;
        passwordInput.setAttribute("type","password");
    }
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    const [username , password] = [
        elements.namedItem("username").value || "",
        elements.namedItem("password").value || ""
    ];

    const userExist = doesUserExist(username);
    const passwordMatch = doesPasswordMatch(username , password);

    if(userExist){
        if(passwordMatch){
            createLocalStorageData(username);
            createLoginSession(username);
            location.replace(`${location.origin}/index.html`);
        } else {
            alert("رمز عبور نادرست است!");
        }
    } else {
        alert("نام کاربری یافت نشد!");
    }
});