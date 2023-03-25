const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

// unsplash api
const count = 30;
const apiKey = "Cv7-yAOkSjDvaLch7vFpXIx3ZmALqcEl7eo9Ky2bKdo";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all img were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// helper function to set atteribute on DOM Ele
function setAttributes(element, atteributes) {
  for (const key in atteributes) {
    element.setAttribute(key, atteributes[key]);
  }
}

// create ele for link and photo
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // create anchor ele to link unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for pic
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //event listener, check when each isfinished loading
    img.addEventListener("load", imageLoaded);

    // put img inside anchor , then put tehm into image container ele
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// get pics
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// check to see if scrolling near bottom of the page ,load more pages
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
