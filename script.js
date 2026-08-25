// --- SCROLL ANIMATIONS ---
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})
},{threshold:0.08});
document.querySelectorAll('.fade').forEach(el=>obs.observe(el));

// --- JAVASCRIPT SMOOTH SCROLL OVERRIDE FOR NAV ---
document.querySelectorAll('.nav-links a, .nav-cta, .hero-btns a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if(targetId.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// --- MULTI-ITEM GALLERY SLIDER LOGIC ---
let currentSlideIndex = 0;

function updateGallerySlider() {
  const track = document.getElementById('galleryTrack');
  const slide = document.querySelector('.slide');
  
  if(!slide) return;

  // Calculate width of one slide + the gap (15px)
  const slideWidth = slide.offsetWidth + 15; 
  track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
}

function nextGallerySlide() {
  const track = document.getElementById('galleryTrack');
  const slide = document.querySelector('.slide');
  const trackContainerWidth = track.parentElement.offsetWidth;
  const slideWidth = slide.offsetWidth + 15;
  
  // Calculate how many slides are currently visible on screen
  const visibleSlides = Math.round(trackContainerWidth / slideWidth);
  const totalSlides = document.querySelectorAll('.slide').length;
  
  // Only slide if we haven't reached the end
  if (currentSlideIndex < totalSlides - visibleSlides) {
    currentSlideIndex++;
    updateGallerySlider();
  }
}

function prevGallerySlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    updateGallerySlider();
  }
}

// Recalculate slider position if the window is resized
window.addEventListener('resize', () => {
  // Reset slider index to 0 on resize to prevent it breaking out of bounds
  currentSlideIndex = 0;
  updateGallerySlider();
});

// --- POPUP LOGIC ---
const overlay = document.getElementById('popupOverlay');

function openPopup(triggerElement, event) {
  event.stopPropagation();
  closeAllPopups();
  triggerElement.classList.add('active-popup');
  overlay.classList.add('active');
}

function closeAllPopups() {
  document.querySelectorAll('.active-popup').forEach(el => el.classList.remove('active-popup'));
  overlay.classList.remove('active');
}

document.addEventListener('click', (event) => {
  if (event.target.closest('.card-popup') || event.target.closest('.slider-arrow')) return;
  closeAllPopups();
});

// --- AM EXPLOSION ANIMATION ---
document.getElementById('amLogo').addEventListener('click', function(e) {
  e.preventDefault();
  this.classList.add('exploding');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => { this.classList.remove('exploding'); }, 500);
});
