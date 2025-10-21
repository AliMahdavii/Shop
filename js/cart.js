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
        cart.map(({name, price, id, mainImage, gallery}) => {

            const galleryImages = Array.isArray(gallery) && gallery.length > 0 ? gallery : [];

            const imageTags = [mainImage, ...galleryImages]
                    .map((img, index) =>
                        `<img src="${img}" alt="${name}" class="${index === 0 ? 'active' : ''}">`
                    )
                    .join("");

            cartItemContainer.insertAdjacentHTML(
                "beforeend",
                `<div class="shopping-card">
                    <div class="img-sec">
                        <div class="product-slider">
                            ${imageTags}

                            <button class="prev">&#10095;</button>
                            <button class="next">&#10094;</button>
                        </div>
                    </div>
                    <div class="title">
                        ${name}
                    </div>
                    <div class="buttons">
                            <span class="price">${price.toLocaleString()} تومان</span>
                            <button onclick="deletItem(${id})" class="deletItem">حذف</button>
                    </div>
                </div>`
            );
        })
        : cartItemContainer.insertAdjacentHTML(
                "beforeend",
                `<p class="empty-p">کالایی در سبد خرید شما وجود ندارد.<p>`
            );

            let totalPrices = 0;
            cart.map(({price}) => {
                totalPrices += price;
            })

            if(totalPrices>0){
            cartContainer.insertAdjacentHTML(
                "beforeend",
                `<p style="font-size:1.3rem; font-weight: 700;">** مجموعا ${cart.length} کالا به ارزش ${totalPrices.toLocaleString()} تومان **</p>`
            )}
    } else{
        cartContainer.insertAdjacentHTML(
            "afterbegin",
            `<p style="font-size:2.5rem; font-weight:500;">ابتدا باید وارد حساب کاربری خود شوید!</p>

            <a href="login.html" class="underline">برای ورود کلیک کنید.</a>`
        );
    }

    document.querySelectorAll(".product-slider").forEach(slider => {
    const imgs = slider.querySelectorAll("img");
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");
    let index = 0;

    function showImage(i) {
        imgs.forEach(img => img.classList.remove("active"));
        imgs[i].classList.add("active");
    }

    prev.addEventListener("click", () => {
        index = (index - 1 + imgs.length) % imgs.length;
        showImage(index);
    });

    next.addEventListener("click", () => {
        index = (index + 1) % imgs.length;
        showImage(index);
    });
    });
});
