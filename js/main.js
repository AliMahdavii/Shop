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
},4000)

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

document.querySelectorAll(".shopping-card .img-sec .stars").forEach(starContainer => {
  const rating = parseInt(starContainer.getAttribute("data-rating"));
  const stars = starContainer.querySelectorAll("i");

  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active");
    }
  });
});
