document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    let autoSlide = setInterval(nextSlide, 5000);
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });

});
const images = [
    'ooo.jpeg',
    'iii.jpeg',
    'ppp.jpeg',
];
let currentImg = 0;
const sliderImg = document.querySelector('.slider-image');

document.querySelector('.simple-next').addEventListener('click', () => {
    currentImg = (currentImg + 1) % images.length;
    sliderImg.src = images[currentImg];
});

document.querySelector('.simple-prev').addEventListener('click', () => {
    currentImg = (currentImg - 1 + images.length) % images.length;
    sliderImg.src = images[currentImg];
});
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

function updateButtonLabel(theme) {
  if (!themeToggleBtn) return; // Добавить проверку
  themeToggleBtn.textContent = theme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';
  themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
}

function applyTheme(theme) {
  rootElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateButtonLabel(theme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(systemPrefersDark ? 'dark' : 'light');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});
