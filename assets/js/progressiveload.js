// only progressive load images with a data-src

// select all images with data src tag -> an array of html image elements
const images = document.querySelectorAll("img[data-src]");

const loadImage = (image) => {
  let fullImage = new Image();
  fullImage.setAttribute("src", image.getAttribute("data-src"));
  image.setAttribute("src", fullImage.getAttribute("src"));
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

// when document finishes loading, we want to start loading images
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    loadImages();
  }
});
