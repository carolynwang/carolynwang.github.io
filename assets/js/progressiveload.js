// only progressive load images with a data-src
const images = document.querySelectorAll("img[data-src]");

const loadImage = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.addEventListener("load", handleCleanup);
};
const cleanup = (image) => {
  image.removeAttribute("data-src");
  image.classList.remove("placeholder");
};

// wrapper callback functions used in event listeners
const handleCleanup = (event) => {
  const image = event.currentTarget;
  cleanup(image);
};
const handleLoadImage = (event) => {
  const image = event.currentTarget;
  image.removeEventListener("load", handleLoadImage);
  loadImage(image);
};

const loadImages = () => {
  images.forEach((image) => {
    if (image.complete) loadImage(image);
    else image.addEventListener("load", handleLoadImage);
  });
};

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "interactive") {
    loadImages();
  }
});
