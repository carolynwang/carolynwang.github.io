const images = document.querySelectorAll("img");
const imagesToPreload = [];

let imagesLoaded = 0;
let progress = 0;
let isLoading = true;

let loader = null;

const renderLoader = () => {
  loader = document.createElement("div");
  loader.classList.add("test-preload");
  loader.textContent = progress;
  document.body.appendChild(loader);
};

const preloadImages = () => {
  /* for each image, make a copy and add to our array of images to preload */
  images.forEach((image) => {
    let imageToPreload = new Image();
    imageToPreload.setAttribute("src", image.getAttribute("src"));
    imagesToPreload.push(imageToPreload);
  });
};

const validateImagesLoaded = () => {
  imagesToPreload.forEach((image, index) => {
    /* we don't want to render if all the images are already loaded (browser has the img cached or on super quick networks)
       so we only render our loader one the first time we hit an image to preload that hasn't been loaded */
    if (!image.complete && loader === null) {
      renderLoader();
    }
    if (image.complete) {
      imagesLoaded += 1;
      progress = Math.floor((imagesLoaded / images.length) * 100);

      /* once an image has been loaded, we want to remove from our array so that we don't make any unnecessary loops */
      imagesToPreload.splice(index, 1);
      if (loader !== null) loader.textContent = progress;
    }
  });

  if (progress === 100) {
    isLoading = false;
    clearInterval(validatationInterval);
    loader.remove();
  }
};

const validationInterval = setInterval(validateImagesLoaded, 100);
preloadImages();
