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
            <a href=""><i class="fa-solid fa-user"></i></a>
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
                <a href=""> خروج </a>
            </div>
        </div>`
        );

        document.getElementById("search-btn").addEventListener("click", () => {
            const searchBox = document.getElementById("search-box");
            searchBox.style.display = searchBox.style.display === "none" ? "inline-block" : "none";
        if (searchBox.style.display === "inline-block") searchBox.focus();
});


        products.map((product) => {
            productSecNew.insertAdjacentHTML(
                "beforeend",
                `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                    <div class="shopping-card">
                    <div class="img-sec">
                        <div class="product-slider">
                            <img src="${product?.mainImage}" alt="" class="active">
                            ${product?.gallery.map(img => `<img src="${img}" alt="">`).join('')}

                            <button class="prev">&#10095;</button>
                            <button class="next">&#10094;</button>
                        </div>
                        ${product.isHotOffer?`<span class="hot-offer">پیشنهاد ویژه</span>`:""}
                        <div class="stars" data-rating="${product?.stars}">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="title">
                        ${product?.name}
                    </div>
                    <div class="buttons">
                        <div class="right">
                            <span class="price">${product?.price.toLocaleString()} تومان</span>
                        </div>
                        <div class="left">
                        <div onclick='addToCart(
                        ${product?.id},
                        ${product?.price},
                        "${product?.name.replace(/"/g, '&quot;')}",
                        "${product?.mainImage}",
                        ${JSON.stringify(product?.gallery).replace(/"/g, '&quot;')}
                        )' class="product-tocart-section">
                            <button>افزودن به سبد خرید</button>
                        </div>
                        
                        <div onclick='addTofavorite(
                        ${product?.id},
                        ${product?.price},
                        "${product?.name.replace(/"/g, '&quot;')}",
                        "${product?.mainImage}",
                        ${JSON.stringify(product?.gallery).replace(/"/g, '&quot;')}
                        )' class="favorite-product">
                            <i class="fas fa-heart"></i>
                        </div>
                        </div>
                    </div>
                </div>
                </div>`);
        });

        superOfferProducts.map((superOfferProduct) => {
            supperOfferSection.insertAdjacentHTML(
                "beforeend",
                `<div class="row">
                <div class="col-lg-9">
                    <div class="supper-offer-box">
                        <span class="supper-offer-box-title"> پیشنهاد شگفت انگیز </span>
                        <div class="body">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="image-container">
                                        <div class="product-slider">
                            <img src="${superOfferProduct?.mainImage}" alt="" class="active">
                            ${superOfferProduct?.gallery.map(img => `<img src="${img}" alt="">`).join('')}

                            <button class="prev">&#10095;</button>
                            <button class="next">&#10094;</button>
                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 info">
                                    <div class="spesificiation">
                                        <div class="title">${superOfferProduct?.name}</div>
                                        <div class="price-row">
                                            <div class="price"> ${superOfferProduct?.price.toLocaleString()} تومان </div>
                                            <div class="discount-price"> ${superOfferProduct?.discountPrice.toLocaleString()} تومان </div>
                                            <div class="off"> ${superOfferProduct.percent}% تخفیف </div>
                                        </div>
                                        <div class="counter-down">
                                            <span id="seconds">55</span> :
                                            <span id="minutes">19</span> :
                                            <span id="hours">15</span>
                                        </div>
                                        <div class="remaining-time"> زمان باقی مانده تا پایان سفارش </div>
                                        <div class="SOffer-buttons">
                                        <div onclick='addToCart(
                                        ${superOfferProduct?.id},
                                        ${superOfferProduct?.discountPrice},
                                        "${superOfferProduct?.name.replace(/"/g, '&quot;')}",
                                        "${superOfferProduct?.mainImage}",
                                        ${JSON.stringify(superOfferProduct?.gallery).replace(/"/g, '&quot;')}
                                        )' class="product-tocart-section">
                                            <button>افزودن به سبد خرید</button>
                                        </div>

                                        <div onclick='addTofavorite(
                                        ${superOfferProduct?.id},
                                        ${superOfferProduct?.price},
                                        "${superOfferProduct?.name.replace(/"/g, '&quot;')}",
                                        "${superOfferProduct?.mainImage}",
                                        ${JSON.stringify(superOfferProduct?.gallery).replace(/"/g, '&quot;')}
                                        )' class="favorite-product">
                                            <i class="fas fa-heart"></i>
                                        </div>
                                        </div>
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
                    <div class="shopping-card">
                    <div class="img-sec">
                        <div class="product-slider">
                            <img src="${otherProduct?.mainImage}" alt="" class="active">
                            ${otherProduct?.gallery.map(img => `<img src="${img}" alt="">`).join('')}

                            <button class="prev">&#10095;</button>
                            <button class="next">&#10094;</button>
                        </div>
                        ${otherProduct.isHotOffer?`<span class="hot-offer">پیشنهاد ویژه</span>`:""}
                        <div class="stars" data-rating="${otherProduct?.stars}">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="title">
                        ${otherProduct?.name}
                    </div>
                    <div class="buttons">
                        <div class="right">
                            <span class="price">${otherProduct?.price.toLocaleString()} تومان</span>
                        </div>
                        <div class="left">
                        <div onclick='addToCart(
                        ${otherProduct?.id},
                        ${otherProduct?.price},
                        "${otherProduct?.name.replace(/"/g, '&quot;')}",
                        "${otherProduct?.mainImage}",
                        ${JSON.stringify(otherProduct?.gallery).replace(/"/g, '&quot;')}
                        )' class="product-tocart-section">
                            <button>افزودن به سبد خرید</button>
                        </div>
                        
                        <div onclick='addTofavorite(
                        ${otherProduct?.id},
                        ${otherProduct?.price},
                        "${otherProduct?.name.replace(/"/g, '&quot;')}",
                        "${otherProduct?.mainImage}",
                        ${JSON.stringify(otherProduct?.gallery).replace(/"/g, '&quot;')}
                        )' class="favorite-product">
                            <i class="fas fa-heart"></i>
                        </div>
                        </div>
                    </div>
                </div>
                </div>`
            );
        });

    document.querySelectorAll(".shopping-card .img-sec .stars").forEach(starContainer => {
    const rating = parseInt(starContainer.getAttribute("data-rating"));
    const stars = starContainer.querySelectorAll("i");

  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active");
    }
  });
  });

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
                <a href="login.html">ثبت نام / ورود</a>
            </div>
        </div>`
        );

       document.getElementById("search-btn").addEventListener("click", () => {
            const searchBox = document.getElementById("search-box");
            searchBox.style.display = searchBox.style.display === "none" ? "inline-block" : "none";
        if (searchBox.style.display === "inline-block") searchBox.focus();
});

        products.map((product) => {
            productSecNew.insertAdjacentHTML(
                "beforeend",
                `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                    <div class="shopping-card">
                    <div class="img-sec">
                        <div class="product-slider">
                            <img src="${product?.mainImage}" alt="" class="active">
                            ${product?.gallery.map(img => `<img src="${img}" alt="">`).join('')}

                            <button class="prev">&#10095;</button>
                            <button class="next">&#10094;</button>
                        </div>
                        ${product.isHotOffer?`<span class="hot-offer">پیشنهاد ویژه</span>`:""}
                        <div class="stars" data-rating="${product?.stars}">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="title">
                        ${product?.name}
                    </div>
                    <div class="buttons">
                        <div class="right">
                            <span class="price">${product?.price.toLocaleString()} تومان</span>
                        </div>
                        <div class="left">
                        <div onclick="goToLogin()" class="product-tocart-section">
                            <button>
                                وارد حساب کاربری شوید
                            </button>
                        </div>

                        <div onclick='addTofavorite(
                        ${product?.id},
                        ${product?.price},
                        "${product?.name.replace(/"/g, '&quot;')}",
                        "${product?.mainImage}",
                        ${JSON.stringify(product?.gallery).replace(/"/g, '&quot;')}
                        )' class="favorite-product">
                            <i class="fas fa-heart"></i>
                        </div>
                        </div>
                    </div>
                </div>
                </div>`);
        });

        otherProducts.map((otherProduct) => {
            
            otherClothes.insertAdjacentHTML(
                "beforeend",
                `<div class="item">
                    <div class="shopping-card">
                    <div class="img-sec">
                        <div class="product-slider">
                            <img src="${otherProduct?.mainImage}" alt="" class="active">
                            ${otherProduct?.gallery.map(img => `<img src="${img}" alt="">`).join('')}

                            <button class="prev">&#10095;</button>
                            <button class="next">&#10094;</button>
                        </div>
                        ${otherProduct.isHotOffer?`<span class="hot-offer">پیشنهاد ویژه</span>`:""}
                        <div class="stars" data-rating="${otherProduct?.stars}">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="title">
                        ${otherProduct?.name}
                    </div>
                    <div class="buttons">
                        <div class="right">
                            <span class="price">${otherProduct?.price.toLocaleString()} تومان</span>
                        </div>
                        <div class="left">
                        <div onclick="goToLogin()" class="product-tocart-section padding-1">
                        <button>
                            وارد حساب کاربری شوید
                        </button>
                    </div>
                    
                    <div onclick='addTofavorite(
                        ${otherProduct?.id},
                        ${otherProduct?.price},
                        "${otherProduct?.name.replace(/"/g, '&quot;')}",
                        "${otherProduct?.mainImage}",
                        ${JSON.stringify(otherProduct?.gallery).replace(/"/g, '&quot;')}
                        )' class="favorite-product">
                            <i class="fas fa-heart"></i>
                        </div>
                        </div>
                    </div>
                </div>
                </div>`
            );
        });

        superOfferProducts.map((superOfferProduct) => {
            supperOfferSection.insertAdjacentHTML(
                "beforeend",
                `<div class="row">
                <div class="col-lg-9">
                    <div class="supper-offer-box">
                        <span class="supper-offer-box-title"> پیشنهاد شگفت انگیز </span>
                        <div class="body">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="image-container">
                                        <div class="product-slider">
                            <img src="${superOfferProduct?.mainImage}" alt="" class="active">
                            ${superOfferProduct?.gallery.map(img => `<img src="${img}" alt="">`).join('')}

                            <button class="prev">&#10095;</button>
                            <button class="next">&#10094;</button>
                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 info">
                                    <div class="spesificiation">
                                        <div class="title">${superOfferProduct?.name}</div>
                                        <div class="price-row">
                                            <div class="price"> ${superOfferProduct?.price.toLocaleString()} تومان </div>
                                            <div class="discount-price"> ${superOfferProduct?.discountPrice.toLocaleString()} تومان </div>
                                            <div class="off"> ${superOfferProduct.percent}% تخفیف </div>
                                        </div>
                                        <div class="counter-down">
                                            <span id="seconds">55</span> :
                                            <span id="minutes">19</span> :
                                            <span id="hours">15</span>
                                        </div>
                                        <div class="remaining-time"> زمان باقی مانده تا پایان سفارش </div>
                                        <div class="SOffer-buttons">
                                        <div onclick="goToLogin()" class="product-tocart-section">
                                            <button>
                                                وارد حساب کاربری شوید
                                            </button>
                                        </div>

                                        <div onclick='addTofavorite(
                                        ${superOfferProduct?.id},
                                        ${superOfferProduct?.price},
                                        "${superOfferProduct?.name.replace(/"/g, '&quot;')}",
                                        "${superOfferProduct?.mainImage}",
                                        ${JSON.stringify(superOfferProduct?.gallery).replace(/"/g, '&quot;')}
                                        )' class="favorite-product">
                                            <i class="fas fa-heart"></i>
                                        </div>
                                        </div>
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

        document.querySelectorAll(".shopping-card .img-sec .stars").forEach(starContainer => {
  const rating = parseInt(starContainer.getAttribute("data-rating"));
  const stars = starContainer.querySelectorAll("i");

        stars.forEach((star, index) => {
          if (index < rating) {
            star.classList.add("active");
          }
        });
      });

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

    }
});
