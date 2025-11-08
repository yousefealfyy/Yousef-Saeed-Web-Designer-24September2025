flatpickr("#fromDate", {
  dateFormat: "Y-m-d", // Format of the date
  allowInput: true
});
/* ================= JS (arrows control the LOWER row only, preserves your DOM) ================= */
(function () {
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const bottomRow = document.querySelector('.bottom-row');

  if (!leftArrow || !rightArrow || !bottomRow) return;

  // compute shift amount dynamically based on first visible card (including gap)
  function getShift() {
    const firstCard = bottomRow.querySelector('.speciality-card');
    if (!firstCard) return 160; // fallback
    const cardWidth = firstCard.getBoundingClientRect().width;
    // estimate gap between items (we use horizontal gap = 24 or computed)
    const style = window.getComputedStyle(bottomRow);
    let gap = 24;
    if (style.gap) gap = parseFloat(style.gap) || gap;
    return Math.round(cardWidth + gap);
  }

  // helper to perform animated shift to left (append first child after move)
  function shiftLeft() {
    const shift = getShift();
    bottomRow.style.transition = 'transform 0.35s ease';
    bottomRow.style.transform = `translateX(-${shift}px)`;

    setTimeout(() => {
      // move first element to end
      const first = bottomRow.firstElementChild;
      if (first) bottomRow.appendChild(first);
      // reset transform without animation
      bottomRow.style.transition = 'none';
      bottomRow.style.transform = 'translateX(0)';
      // force reflow to allow subsequent transitions
      void bottomRow.offsetWidth;
      bottomRow.style.transition = 'transform 0.35s ease';
    }, 360);
  }

  // helper to shift right (insert last child before first)
  function shiftRight() {
    const shift = getShift();
    bottomRow.style.transition = 'transform 0.35s ease';
    bottomRow.style.transform = `translateX(${shift}px)`;

    setTimeout(() => {
      const last = bottomRow.lastElementChild;
      if (last) bottomRow.insertBefore(last, bottomRow.firstElementChild);
      bottomRow.style.transition = 'none';
      bottomRow.style.transform = 'translateX(0)';
      void bottomRow.offsetWidth;
      bottomRow.style.transition = 'transform 0.35s ease';
    }, 360);
  }

  rightArrow.addEventListener('click', shiftLeft);
  leftArrow.addEventListener('click', shiftRight);

  // optional: keyboard arrows (left/right) for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') shiftLeft();
    if (e.key === 'ArrowLeft') shiftRight();
  });
})();

const slider = document.querySelector('.doctor-slider');
let isDown = false;
let startX;
let scrollLeft;

// Duplicate all cards to create infinite loop effect
slider.innerHTML += slider.innerHTML;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.3;
  slider.scrollLeft = scrollLeft - walk;

  const scrollWidth = slider.scrollWidth / 2;
  if (slider.scrollLeft >= scrollWidth) {
    slider.scrollLeft -= scrollWidth; // jump back to start smoothly
  } else if (slider.scrollLeft <= 0) {
    slider.scrollLeft += scrollWidth; // jump to end smoothly
  }
});

// Optional: auto-loop for smoother continuous motion
let autoScroll;
function startAutoScroll() {
  autoScroll = setInterval(() => {
    slider.scrollLeft += 1;
    const scrollWidth = slider.scrollWidth / 2;
    if (slider.scrollLeft >= scrollWidth) {
      slider.scrollLeft -= scrollWidth;
    }
  }, 15); // smaller = faster scroll
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

slider.addEventListener('mouseenter', stopAutoScroll);
slider.addEventListener('mouseleave', startAutoScroll);

startAutoScroll();

// ===========
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");

    document.querySelectorAll(".faq-item").forEach(other => {
      if (other !== item) other.classList.remove("active");
    });
  });
});
// ============
 const slides = document.querySelectorAll(".testimonial-slide");
  let index = 0;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    slides[n].classList.add("active");
  }

  document.getElementById("prevBtn").onclick = () => {
    index = (index > 0) ? index - 1 : slides.length - 1;
    showSlide(index);
  };

  document.getElementById("nextBtn").onclick = () => {
    index = (index < slides.length - 1) ? index + 1 : 0;
    showSlide(index);
  };

  // ==========
// Lightweight partners slider (drop into your page, after the HTML)
(function () {
  const track = document.getElementById('partnersTrack');
  if (!track) return;

  // measure and helpers
  const getCardWidth = () => {
    const first = track.children[0];
    if (!first) return 0;
    const rect = first.getBoundingClientRect();
    const style = window.getComputedStyle(first);
    const marginLeft = parseFloat(style.marginLeft || 0);
    const marginRight = parseFloat(style.marginRight || 0);
    return rect.width + marginLeft + marginRight;
  };

  // initial setup
  const originalCount = track.children.length;
  if (originalCount === 0) return;

  // Duplicate content once (makes visual infinite loop)
  track.innerHTML += track.innerHTML;

  let cardWidth = Math.round(getCardWidth());
  let index = 0;
  let timerId = null;
  const transitionMs = 600;          // time of slide transition (ms)
  const pauseBetweenMs = 1500;       // pause between slides (ms)
  const stepInterval = transitionMs + pauseBetweenMs;

  // Ensure correct inline styles for smooth behaviour
  track.style.willChange = 'transform';
  track.style.transform = 'translateX(0)';

  // Perform a single step (move to next card)
  function step() {
    index++;
    track.style.transition = `transform ${transitionMs}ms ease`;
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    // if we've reached the "duplicate boundary", jump back to start WITHOUT animation
    if (index >= originalCount) {
      // after the transition finishes, snap back to start (no animation)
      setTimeout(() => {
        track.style.transition = 'none';
        // reset transform to 0
        track.style.transform = `translateX(0)`;
        // force reflow so browser applies the "no transition" transform immediately
        // then reset index so next step moves to 1
        void track.offsetWidth;
        index = 0;
      }, transitionMs + 20); // small buffer after animation ends
    }
  }

  // start/stop autoplayer
  function startAuto() {
    if (timerId) return;
    timerId = setInterval(step, stepInterval);
  }
  function stopAuto() {
    if (!timerId) return;
    clearInterval(timerId);
    timerId = null;
  }

  // responsive: recalc widths on resize
  let resizeTimeout;
  function onResize() {
    stopAuto();
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      cardWidth = Math.round(getCardWidth()) || cardWidth;
      // correct current transform to match index after width change
      track.style.transition = 'none';
      track.style.transform = `translateX(-${index * cardWidth}px)`;
      void track.offsetWidth;
      startAuto();
    }, 120);
  }
  window.addEventListener('resize', onResize);

  // pause while hovering
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  // init sizes (small timeout to let images load & layout settle)
  setTimeout(() => {
    cardWidth = Math.round(getCardWidth()) || cardWidth;
    // ensure we start clean
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    index = 0;
    // start autoplay
    startAuto();
  }, 150);

  // expose for debugging (optional)
  // window._partnersSlider = { startAuto, stopAuto, step };
})();