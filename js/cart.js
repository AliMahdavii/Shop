const loggedInUser = JSON.parse(
    localStorage.getItem("logged-in")
)?.username;

const cartContainer = document.querySelector(".cart-container");
const cartItemContainer = document.querySelector("#cart-items-container");

document.addEventListener("DOMContentLoaded", () => {
    if(loggedInUser){
        const cart = JSON.parse(localStorage.getItem(loggedInUser))?.cart;
        cartContainer.insertAdjacentHTML(
            "afterbegin",
            `<p style="font-size:2rem; font-weight: 700;">سبد خرید شما:</p>
            <p style="font-size:1rem;">username : ${loggedInUser}</p>
            <a href="index.html" style="font-size:1rem;" class="underline" >بازگشت به صفحه اصلی</a>`
        );

        cart.length > 0 ?
        cart.map(({name, price, id, img}) => {
            cartItemContainer.insertAdjacentHTML(
                "beforeend",
                `<div class="cart-item">
                    <img src="${img}" alt="">
                    <p class="">${name}</p>
                    <p>قیمت : ${price.toLocaleString()}</p>
                    <button onclick="deletItem(${id})">حذف</button>
                </div>`
            );
        })
        : cartItemContainer.insertAdjacentHTML(
                "beforeend",
                `<p class="emptt-p">کالایی در سبد خرید شما وجود ندارد.<p>`
            );

            let totalPrices = 0;
            cart.map(({price}) => {
                totalPrices += price;
            })

            if(totalPrices>0){
            cartContainer.insertAdjacentHTML(
                "beforeend",
                `<p style="font-size:1.3rem; font-weight=500;">** مجموعا ${cart.length} کالا به ارزش ${totalPrices.toLocaleString()} تومان **</p>`
            )}
    } else{
        cartContainer.insertAdjacentHTML(
            "beforeend",
            `<p class="">ابتدا باید وارد حساب کاربری خود شوید!</p>

            <a href="login.html" class="">برای ورود کلیک کنید.</a>`
        );
    }
});
