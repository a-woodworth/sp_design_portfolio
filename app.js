const images = [...document.querySelectorAll('.gallery-item')];
const slider = document.querySelector('[data-js="slider"]');
const prevBtn = document.querySelector('[data-js="previous"]');
const nextBtn = document.querySelector('[data-js="next"]');
const active = images.find(image => image.classList.contains('active'));
let currentImage = images.indexOf(active); 

function getSlidePosition() {
  const activeSlide = images[currentImage];

  // Calculate width from center for translateX shift
  const sideMargin = Math.floor((slider.offsetWidth - activeSlide.offsetWidth) / 2);

  return - Math.floor(activeSlide.offsetLeft - sideMargin);
}

function updateSlider() {
  slider.style.transform = `translateX(${getSlidePosition()}px)`;
}

function showImage() {
  images[currentImage].classList.add('active');
  images[currentImage].removeAttribute('aria-hidden');
  images[currentImage].setAttribute('tabindex', 0);
}

function hidePrevOrNextImage() {
  images[currentImage].classList.remove('active');
  images[currentImage].setAttribute('aria-hidden', true);
  images[currentImage].setAttribute('tabindex', -1);
}

function scrollToNextImage() {
  // Remove last image settings
  hidePrevOrNextImage();

  if (currentImage < images.length - 1) {
    currentImage ++;
  } else {
    currentImage = 0;
  }
  // Get image and update slider position
  showImage();
  updateSlider();
}

function scrollToPrevImage() {
  // Remove last image settings
  hidePrevOrNextImage();

  if (currentImage > 0) {
    currentImage --;
  } else {
    currentImage = images.length - 1;
  }
  // Get image and update slider position
  showImage();
  updateSlider();
}

// Initialize active slide
updateSlider();

// Setup previous and next buttons
prevBtn.addEventListener('click', scrollToPrevImage);
nextBtn.addEventListener('click', scrollToNextImage);
