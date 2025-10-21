const imageContainer = document.querySelector(".image-container");
const imagesArray = [
  {
    src: "public/opening-page-image/opening-page-bg-image1.jpg",
    alt: "nature mountain",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image2.jpg",
    alt: "forest nature",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image3.jpg",
    alt: "nature sunset river",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image4.jpg",
    alt: "night sky, stars",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image5.jpg",
    alt: "forest, bridge",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image6.jpg",
    alt: "forest, lake, nature",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image7.jpg",
    alt: "beautiful scenery",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image8.jpg",
    alt: "forest, bridge",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image9.jpg",
    alt: "nature, flowers, mountain",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image10.jpg",
    alt: "foggy weather, beautiful tree",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image11.jpg",
    alt: "lake, mountains",
  },
  {
    src: "public/opening-page-image/opening-page-bg-image12.jpg",
    alt: "beautiful scenery of nature",
  },
];
imagesArray.forEach((image, i) => {
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
