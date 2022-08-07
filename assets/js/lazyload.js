const images = document.querySelectorAll("img[data-src]");

const handleCleanup = (event) => {
  const image = event.currentTarget;
  cleanup(image);
};

const handleLoadImage = (event) => {
  const image = event.currentTarget;
  image.removeEventListener("load", handleLoadImage);
  loadImage(image);
};

const loadImage = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.addEventListener("load", handleCleanup);
};

const cleanup = (image) => {
  image.removeAttribute("data-src");
  image.classList.remove("placeholder");
};

images.forEach((image) => {
  if (image.complete) loadImage(image);
  else image.addEventListener("load", handleLoadImage);
});
