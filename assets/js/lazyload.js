const images = document.querySelectorAll("img[data-src]");

const loadImage = (event) => {
  const image = event.currentTarget;
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
    image.removeEventListener("load", loadImage);
    image.classList.remove("placeholder");
  };
};

images.forEach((image) => {
  image.addEventListener("load", loadImage);
});
