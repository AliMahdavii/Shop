import doesPasswordMatch from "./utils/doesPasswordMatch.js";
import doesUserExist from "./utils/doesUserExist.js";
import users from "./constants/users.js";
import createLocalStorageData from "./utils/createLocalStorageData.js";
import createLoginSession from "./utils/createLoginSession.js";

const hidePasswordElement = document.querySelector("#hide-password");
const loginForm = document.querySelector("#login-form");
const passwordInput = document.querySelector("#password");

let isPasswordVisible = false;

hidePasswordElement.addEventListener("click", () => {
    const isVisible = passwordInput.type === "text";

    passwordInput.type = isVisible ? "password" : "text";

    hidePasswordElement.classList.toggle("fa-eye", isVisible);
    hidePasswordElement.classList.toggle("fa-eye-slash", !isVisible);
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