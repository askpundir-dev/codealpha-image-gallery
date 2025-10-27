import { galleryImages } from "./data/galleryImagesArray.js";
import { carImages } from "./data/carImagesArray.js";

const galleryGrid = document.querySelector(".gallery-grid");
// console.log([galleryGrid]);

galleryImages.forEach((image) => {
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  const imageElem = document.createElement("img");
  imageElem.alt = image.alt;
  imageElem.src = image.src;
  imageElem.loading = "lazy";

  imageContainer.appendChild(imageElem);
  galleryGrid.appendChild(imageContainer);
});

const tabsContainer = document.querySelector(".tabs-container");
tabsContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const selectedCategory = e.target.textContent.toLowerCase();
    console.log(selectedCategory);

    //clear existing images
    galleryGrid.innerHTML = "";

    let imagesToDisplay = [];
    if (selectedCategory === "all") {
      imagesToDisplay = [...galleryImages, ...carImages];
    } else if (selectedCategory === "nature") {
      imagesToDisplay = galleryImages.filter((img) => img.type === "nature");
    } else if (selectedCategory === "cars") {
      imagesToDisplay = carImages;
    } else if (selectedCategory === "bikes") {
      imagesToDisplay = galleryImages.filter((img) => img.type === "bike");
    }

    imagesToDisplay.forEach((image) => {
      const imageContainer = document.createElement("div");
      imageContainer.className = "image-container";
      const imageElem = document.createElement("img");
      imageElem.alt = image.alt;
      imageElem.src = image.src;
      imageElem.loading = "lazy";

      imageContainer.appendChild(imageElem);
      galleryGrid.appendChild(imageContainer);
    });
  }
});

//full scroll back to top logic with throttling 🔥
const scrollBtn = document.querySelector(".scroll-back-to-top");
let lastScrollTime = 0;

window.addEventListener("scroll", () => {
  const now = Date.now();
  if (now - lastScrollTime < 100) return; // throttle to every 100ms
  lastScrollTime = now;

  const shouldShow = window.scrollY > 200;
  scrollBtn.classList.toggle("scroll-top-active", shouldShow);
});

scrollBtn.onclick = () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// const year = new Date().getFullYear();
// console.log(year);

// const footerCopyRightPara = (document.querySelector(
//   ".footer .copy-right-para"
// ).innerHTML = `Abhishek Pundir &copy; ${year}`);

document.querySelector(
  ".copy-right-para"
).innerHTML = `Abhishek Pundir &copy; ${new Date().getFullYear()}`;
