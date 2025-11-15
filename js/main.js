let slideIndex=1;
let remainingTime=70000;

function setTime(){
    if(remainingTime==0) return;
    let h = Math.floor(remainingTime/3600);
    let m = Math.floor((remainingTime%3600)/60);
    let s = (remainingTime%3600)%60;
    document.querySelector('#hours').innerHTML = h;
    document.querySelector('#minutes').innerHTML = m;
    document.querySelector('#seconds').innerHTML = s;
}

setInterval(()=>{
    remainingTime--;
    setTime()
},1000)

function setSlide(input,index){
    slideIndex=index;
    let item=document.querySelector(`#${input}`)
    let slides=[...document.querySelector('.slides').children];
    slides.forEach((element)=>{
        element.classList.remove('active');
    })
    item.classList.add('active');
}

setInterval(()=>{
    slideIndex++;
    if(slideIndex>5) slideIndex=1;
    setSlide(`slide${slideIndex}`,slideIndex)
},4000);


import products from "./constants/product.js";
import superOfferProducts from "./constants/supperOfferProduct.js";
import otherProducts from "./constants/otherProducts.js";

const doesUserLoggedIn = JSON.parse(
  localStorage.getItem("logged-in")
)?.username;

const headerDynamicContentContainer = document.querySelector("#header-dynamic-content");
const productSecNew = document.querySelector(".product-sec-new");
const supperOfferSection = document.querySelector(".supper-offer-section");
const otherClothes = document.querySelector(".other-clothes");

document.addEventListener("DOMContentLoaded", ()=>{
    if(doesUserLoggedIn){

        const cartData = JSON.parse(localStorage.getItem(doesUserLoggedIn)) || {};
        const cart = cartData.cart || [];

        headerDynamicContentContainer.insertAdjacentHTML(
            "beforeend",
                `<div class="nav-right">
            <a href="profile.html"><i class="fa-solid fa-user"></i></a>
            <a href="cart.html"><i class="fa-solid fa-cart-shopping">
                <span id="cart-badge">${cart.length}</span>
            </i></a>
            <a href="index.html"><i class="fa-solid fa-house"></i></a>
            <a href="javascript:void(0)" id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></a>
            <input type="text" id="search-box" placeholder="جستجو..." style="display:none;">
                </div>
        <div class="nav-left">
            <div class="register-login-btn" onclick="logout()" id="logout-button">
                <i class="fa-solid fa-right-from-bracket"></i>
                <a href="" class="font-rokh"> خروج </a>
            </div>
        </div>`
        );

        const searchBtn = document.getElementById("search-btn");
        const searchBox = document.getElementById("search-box");

        searchBtn.addEventListener("click", () => {

            if (searchBox.style.display === "none" || searchBox.style.display === "") {
            searchBox.style.display = "inline-block";
            searchBox.focus();
          } else {

            const query = searchBox.value.trim();
            if (query) {
              window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            } else {

                searchBox.style.display = "none";
            }
          }
    });

  searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchBox.value.trim();
      if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
      }
    }
  });

    } else{
        headerDynamicContentContainer.insertAdjacentHTML(
            "beforeend",
            `<div class="nav-right">
            <a href="login.html"><i class="fa-solid fa-user"></i></a>
            <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>
            <a href="index.html"><i class="fa-solid fa-house"></i></a>
            <a href="javascript:void(0)" id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></a>
            <input type="text" id="search-box" placeholder="جستجو..." style="display:none;">
                </div>
        <div class="nav-left">
            <div class="register-login-btn">
                <i class="fa-solid fa-user"></i>
                <a href="login.html" class="font-rokh">ثبت نام / ورود</a>
            </div>
        </div>`
        );

       document.getElementById("search-btn").addEventListener("click", () => {
            const searchBox = document.getElementById("search-box");
            searchBox.style.display = searchBox.style.display === "none" ? "inline-block" : "none";
        if (searchBox.style.display === "inline-block") searchBox.focus();
});

document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("logged-in"))?.username;
    if (!loggedInUser) return;

    const favorites = JSON.parse(localStorage.getItem(loggedInUser))?.favorites || [];

    favorites.forEach(fav => {
        const favElement = document.querySelector(`.favorite-product[data-id="${fav.id}"]`);
        if (favElement) {
            favElement.classList.add("active");
            favElement.querySelector("i").classList.remove("far");
            favElement.querySelector("i").classList.add("fas");
        }
    });
});

    }

    products.map((product) => {
            productSecNew.insertAdjacentHTML(
                "beforeend",
                `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                    <div class="shopping-card" onclick="openProduct('${product?.id}')">
                    <div class="img-sec">
                        <div class="product-slider">
                            <img src="${product?.mainImage}" alt="" class="active">
                            ${product?.gallery.map(img => `<img src="${img}" alt="">`).join('')}
                        </div>
                        ${product.isHotOffer?`<span class="hot-offer font-rokh">پیشنهاد ویژه</span>`:""}
                    </div>
                    <div class="title font-rokh">
                        ${product?.name}
                    </div>
                    <div class="buttons">
                            <span class="price font-rokh">${product?.price.toLocaleString()} تومان</span>
                    </div>
                </div>
                </div>`);
        });

        superOfferProducts.map((superOfferProduct) => {
            supperOfferSection.insertAdjacentHTML(
                "beforeend",
                `<div class="row">
                <div class="col-lg-9">
                    <div class="supper-offer-box" onclick="openProduct('${superOfferProduct?.id}')">
                        <span class="supper-offer-box-title font-rokh"> پیشنهاد شگفت انگیز </span>
                        <div class="body">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="image-container">
                                        <div class="product-slider">
                            <img src="${superOfferProduct?.mainImage}" alt="" class="active">
                            ${superOfferProduct?.gallery.map(img => `<img src="${img}" alt="">`).join('')}
                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 info">
                                    <div class="spesificiation">
                                        <div class="title font-rokh">${superOfferProduct?.name}</div>
                                        <div class="price-row">
                                            <div class="price font-rokh"> ${superOfferProduct?.price.toLocaleString()} تومان </div>
                                            <div class="discount-price font-rokh"> ${superOfferProduct?.discountPrice.toLocaleString()} تومان </div>
                                            <div class="off font-rokh"> ${superOfferProduct.percent}% تخفیف </div>
                                        </div>
                                        <div class="counter-down">
                                            <span id="seconds">55</span> :
                                            <span id="minutes">19</span> :
                                            <span id="hours">15</span>
                                        </div>
                                        <div class="remaining-time font-rokh"> زمان باقی مانده تا پایان سفارش </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="banner">
                        <img src="images/IMG_1927.JPG" alt="">
                    </div>
                </div>
            </div>`
            );
        });

        otherProducts.map((otherProduct) => {
            
            otherClothes.insertAdjacentHTML(
                "beforeend",
                `<div class="item">
                    <div class="shopping-card" onclick="openProduct('${otherProduct?.id}')">
                    <div class="img-sec">
                        <div class="product-slider">
                            <img src="${otherProduct?.mainImage}" alt="" class="active">
                            ${otherProduct?.gallery.map(img => `<img src="${img}" alt="">`).join('')}
                        </div>
                        ${otherProduct.isHotOffer?`<span class="hot-offer font-rokh">پیشنهاد ویژه</span>`:""}
                    </div>
                    <div class="title font-rokh">
                        ${otherProduct?.name}
                    </div>
                    <div class="buttons">
                            <span class="price font-rokh">${otherProduct?.price.toLocaleString()} تومان</span>
                    </div>
                </div>
                </div>`
            );
        });

});

document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("logged-in"))?.username;
    if (!loggedInUser) return;

    const favorites = JSON.parse(localStorage.getItem(loggedInUser))?.favorites || [];

    favorites.forEach(fav => {
        const favElement = document.querySelector(`.favorite-product[data-id="${fav.id}"]`);
        if (favElement) {
            favElement.classList.add("active");
        }
    });
});
