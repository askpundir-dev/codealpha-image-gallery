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
const tabs = tabsContainer.querySelectorAll(".tabs-container li");
tabsContainer.addEventListener("click", (e) => {
  const tab = e.target.closest("li");
  if (!tab) return; // exit if not clicking a tab

  const selectedCategory = tab.textContent.trim().toLowerCase();
  console.log(selectedCategory);
  tabs.forEach((t) => t.classList.remove("active"));
  e.target.classList.add("active");
  console.log(e.target);

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

const galleryImagesOnWebsite = Array.from(galleryGrid.querySelectorAll("img")); // store all image elements
console.log(galleryImagesOnWebsite);
galleryGrid.addEventListener("click", (e) => {
  const image = e.target.closest("img");
  if (!image) return;

  // Find index of clicked image
  let currentIndex = galleryImagesOnWebsite.indexOf(image);

  // Create overlay
  const imageBackground = document.createElement("div");
  imageBackground.classList.add("image-background-overlay");

  // Create container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("enlarged-image-container");

  // Create enlarged image
  const imageElem = document.createElement("img");
  imageElem.src = image.src;
  imageElem.alt = image.alt;
  imageElem.classList.add("enlarged-image");

  // Create navigation buttons
  const prevBtn = document.createElement("button");
  prevBtn.classList.add("nav-btn", "prev-btn");
  prevBtn.textContent = "←";

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("nav-btn", "next-btn");
  nextBtn.textContent = "→";

  // Append everything
  imageContainer.appendChild(prevBtn);
  imageContainer.appendChild(imageElem);
  imageContainer.appendChild(nextBtn);
  imageBackground.appendChild(imageContainer);
  document.body.appendChild(imageBackground);

  // Navigation logic
  const showImage = (index) => {
    const total = galleryImages.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    imageElem.src = galleryImages[index].src;
    imageElem.alt = galleryImages[index].alt;
    currentIndex = index;
  };

  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  // Close modal when clicking background
  imageBackground.addEventListener("click", (e) => {
    if (e.target === imageBackground) imageBackground.remove();
  });

  // Optional: keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "Escape") imageBackground.remove();
  });
});

// const year = new Date().getFullYear();
// console.log(year);

// const footerCopyRightPara = (document.querySelector(
//   ".footer .copy-right-para"
// ).innerHTML = `Abhishek Pundir &copy; ${year}`);

document.querySelector(
  ".copy-right-para"
).innerHTML = `Abhishek Pundir &copy; ${new Date().getFullYear()}`;
