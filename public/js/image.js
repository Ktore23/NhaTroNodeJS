// Carousel cho hình ảnh
let currentImage = 0;
const images = document.querySelectorAll('.post-images img');

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function nextImage() {
    currentImage = (currentImage + 1) % images.length;
    showImage(currentImage);
}

function prevImage() {
    currentImage = (currentImage - 1 + images.length) % images.length;
    showImage(currentImage);
}