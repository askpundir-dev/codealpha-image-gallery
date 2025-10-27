import { openingPageImagesArray } from "./data/openingPageImagesArray.js";
const imageContainer = document.querySelector(".image-container");

openingPageImagesArray.forEach((image, i) => {
  const elImage = document.createElement("img");
  elImage.src = image.src;
  elImage.alt = image.alt;
  elImage.className = "landing-page-image";
  elImage.loading = "lazy";
  if (i === 0) {
    elImage.style.opacity = 1;
    elImage.loading = "eager";
  }
  imageContainer.appendChild(elImage);
});

let currentIndex = 0;
const images = document.querySelectorAll(".image-container img");

setInterval(() => {
  images[currentIndex].style.opacity = 0;
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].style.opacity = 1;
}, 3800);

const enterGalleryButton = document.querySelector(".enter-gallery");
enterGalleryButton.onclick = () => (window.location.href = "gallery.html");
