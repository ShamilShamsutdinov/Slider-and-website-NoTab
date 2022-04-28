const images = document.querySelectorAll('.slider .slider-line img');
const sliderLine = document.querySelector('.slider-line');
const slider = document.querySelector('.slider');
const bulletList = document.querySelectorAll('.span-item');

const buttonNext = document.querySelector('.button-next');
const buttonPrew = document.querySelector('.button-prew');

let offset = 0;
let currentSlide = 0;
let width;
const countSlides = images.length - 1;
console.log(countSlides)

function init() {
    console.log('resize');
    width = slider.offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    images.forEach(item => {
        item.style.width = width + 'px';
        item.style.height = 'auto';
    })

}


window.addEventListener('resize', init);

function right() {
    init();

    if (currentSlide === countSlides) {
        currentSlide = 0
        offset = 0;
    } else {
        offset = offset + width;
        ++currentSlide
    }


    setSlideOffset();
    onButtonSetBlacklightBullet(currentSlide)
}


function left() {
    init();
    if (currentSlide === 0) {
        currentSlide = countSlides
        console.log(countSlides)
        offset = offset + width * currentSlide;

    } else {
        offset = offset - width;
        --currentSlide
    }

    setSlideOffset()
    onButtonSetBlacklightBullet(currentSlide)
}

buttonNext.addEventListener('click', right);

buttonPrew.addEventListener('click', left);

bulletList.forEach(item => {
    item.addEventListener('click', (e) => {
        const numBullet = Number(e.target.dataset.span)

        if (numBullet === currentSlide) return

        setBacklightBullet(e.target)

        if (currentSlide > numBullet) {
            offset = offset - width * (currentSlide - numBullet);
        }

        if (currentSlide < numBullet) {
            offset = offset + width * (numBullet - currentSlide);
        }

        setSlideOffset()
        currentSlide = numBullet;
    })
})

// подсвечивание кнопки
// параметр - дом элемент
function setBacklightBullet(bullet) {
    if (bullet.classList.contains('span-item--green')) return
    removeBacklightBullet()
    addBacklightBullet(bullet)
}

function onButtonSetBlacklightBullet(number) {
    removeBacklightBullet()
    const newBullet = document.querySelector(`[data-span="${number}"]`)
    addBacklightBullet(newBullet)
}

function removeBacklightBullet() {
    if (!document.querySelector('.span-item--green')) return
    document.querySelector('.span-item--green').classList.remove('span-item--green')
}

function addBacklightBullet(bullet) {
    bullet.classList.add('span-item--green')
}

function setSlideOffset() {
    sliderLine.style.left = -offset + 'px';

}
