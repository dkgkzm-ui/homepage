let currentSlide = 0;
const totalSlides = 4;
const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.slider-dot');
const video = document.getElementById('game-video');

function updateSlider() {
    // 슬라이더 이동
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // 닷(Dot) 인디케이터 업데이트
    dots.forEach((dot, index) => {
        if(index === currentSlide) {
            dot.className = 'slider-dot w-3 h-3 rounded-full bg-white transition-all shadow-[0_0_8px_rgba(255,255,255,0.8)]';
        } else {
            dot.className = 'slider-dot w-3 h-3 rounded-full bg-white/40 hover:bg-white/80 transition-all';
        }
    });

    // 영상 자동재생 관리
    if(currentSlide === 3) {
        video.play().catch(e => console.log("Autoplay prevented"));
    } else {
        video.pause();
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// 자동 슬라이드 (영상이 재생 중일 때는 멈춤)
let autoSlide = setInterval(() => {
    if (currentSlide !== 3) { 
        nextSlide();
    }
}, 5000);

// 슬라이더에 마우스 오버 시 자동 넘김 일시정지
const sliderContainer = document.querySelector('.group');
sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
sliderContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        if (currentSlide !== 3) {
            nextSlide();
        }
    }, 5000);
});
