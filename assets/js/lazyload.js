const images = document.querySelectorAll("img[data-src]");

const cleanup = (event) => {
  const image = event.currentTarget;
  image.removeAttribute("data-src");
  image.classList.remove("placeholder");
};

const loadImage = (event) => {
  const image = event.currentTarget;
  image.setAttribute("src", image.getAttribute("data-src"));
  image.removeEventListener("load", loadImage);
  image.addEventListener("load", cleanup);
};

images.forEach((image) => {
  image.addEventListener("load", loadImage);
});
