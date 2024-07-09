const image = document.getElementById('scrollable-image');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-btn');

image.addEventListener('click', () => {
    popup.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    popup.classList.remove('active');
});
