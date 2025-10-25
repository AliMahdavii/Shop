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

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function setLoggedInUser(username) {
    localStorage.setItem("logged-in",JSON.stringify({username}));
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = event.target.elements.namedItem("username").value.trim();
    const password = event.target.elements.namedItem("password").value.trim();

    const users = getUsers();
    const user = users.find(u => u.username === username);

    if(!user){
        alert("نام کاربری یافت نشد!");
        return;
    }

    if(user.password !== password){
        alert("رمز عبور نادرست است!");
        return;
    }

    setLoggedInUser(username);
    alert("با موفقیت وارد شدید!");
    location.replace("index.html");

});