import { galleryImages } from "./data/galleryImagesArray.js";

const galleryGrid = document.querySelector(".gallery-grid");
// console.log([galleryGrid]);

const footer = document.querySelector(".footer");
const scrollBtn = footer.querySelector(".scroll-back-to-top");

galleryImages.forEach((image) => {
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  const imageElem = document.createElement("img");
  imageElem.className = "images";
  imageElem.alt = image.alt;
  imageElem.src = image.src;
  imageElem.dataset.type = image.type;
  imageElem.loading = "lazy";

  imageContainer.appendChild(imageElem);
  galleryGrid.appendChild(imageContainer);
  imageElem.classList.add("loading");
});
document.addEventListener("DOMContentLoaded", () => {
  footer.classList.add("loading");
  const images = galleryGrid.querySelectorAll(".images.loading");

  if (images.length > 0) {
    setTimeout(() => {
      images.forEach((image) => {
        image.classList.remove("loading");
      });
      footer.classList.remove("loading");
    }, 1200);
  }
});

const allImageNodeList = galleryGrid.querySelectorAll("img");
// console.log(allImageNodeList);

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
  if (selectedCategory === "all") {
    allImageNodeList.forEach((img) => {
      img.parentElement.style.display = "block";
    });
  } else {
    allImageNodeList.forEach((img) => {
      if (img.dataset.type === selectedCategory) {
        img.parentElement.style.display = "block";
      } else {
        img.parentElement.style.display = "none";
      }
    });
  }
});

//full scroll back to top logic with throttling 🔥
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

galleryGrid.addEventListener("click", (e) => {
  const visibleImages = [...allImageNodeList].filter(
    (img) => img.parentElement.style.display !== "none"
  );

  console.log(visibleImages);

  const image = e.target.closest("img");
  if (!image) return;

  // Find index of clicked image
  let currentIndex = visibleImages.indexOf(image);

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
  prevBtn.innerHTML = "<span>←</span>";

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("nav-btn", "next-btn");
  nextBtn.innerHTML = "<span>→</span>";

  //close button
  const closeFullViewButton = document.createElement("button");
  closeFullViewButton.classList.add("close-full-view-button");
  closeFullViewButton.innerHTML = "<span>X</span>";

  // Append everything
  imageContainer.appendChild(closeFullViewButton);
  imageContainer.appendChild(prevBtn);
  imageContainer.appendChild(imageElem);
  imageContainer.appendChild(nextBtn);
  imageBackground.appendChild(imageContainer);
  document.body.appendChild(imageBackground);

  // Navigation logic
  const showImage = (index) => {
    imageElem.style.opacity = 0;
    const total = visibleImages.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    setTimeout(() => {
      imageElem.src = visibleImages[index].src;
      imageElem.alt = visibleImages[index].alt;
      currentIndex = index;
      imageElem.onload = () => (imageElem.style.opacity = 1);
    }, 150);
  };

  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  // // Close modal when clicking background
  // imageBackground.addEventListener("click", (e) => {
  //   if (e.target === imageBackground) imageBackground.remove();
  // });

  // keyboard navigation
  const handleKeydown = (e) => {
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "Escape") closeFullView();
  };

  // touch screen navigation
  let startX = 0;
  imageContainer.addEventListener("touchmove", (e) => e.preventDefault(), {
    passive: false,
  });

  imageContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  imageContainer.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      // threshold for swipe
      if (diff > 0) {
        // Swiped left = Next image
        showImage(currentIndex + 1);
      } else {
        // Swiped right = Previous image
        showImage(currentIndex - 1);
      }
    }
  });

  const closeFullView = () => {
    document.removeEventListener("keydown", handleKeydown);
    imageBackground.remove();
  };

  closeFullViewButton.onclick = closeFullView;
  document.addEventListener("keydown", handleKeydown);
});

// const year = new Date().getFullYear();
// console.log(year);

// const footerCopyRightPara = (document.querySelector(
//   ".footer .copy-right-para"
// ).innerHTML = `Abhishek Pundir &copy; ${year}`);

document.querySelector(
  ".copy-right-para"
).innerHTML = `Abhishek Pundir &copy; ${new Date().getFullYear()}`;
