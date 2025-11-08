// ===================== NAVBAR INTERACTIONS =====================

// SEARCH TOGGLE
const searchToggle = document.getElementById("searchToggle");
const toggleSearchBox = document.getElementById("toggleSearchBox");

if (searchToggle && toggleSearchBox) {
  searchToggle.addEventListener("click", () => {
    toggleSearchBox.style.display =
      toggleSearchBox.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (
      !searchToggle.contains(e.target) &&
      !toggleSearchBox.contains(e.target)
    ) {
      toggleSearchBox.style.display = "none";
    }
  });
}

// DARK MODE TOGGLE
const darkModeToggle = document.getElementById("dark-mode-toggle");
const darkIcon = document.getElementById("darkIcon");

if (darkModeToggle && darkIcon) {
  // Restore user preference
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkIcon.classList.replace("fa-sun", "fa-moon");
  }

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (isDark) {
      darkIcon.classList.replace("fa-sun", "fa-moon");
    } else {
      darkIcon.classList.replace("fa-moon", "fa-sun");
    }
  });
}

// BOOTSTRAP DROPDOWN FIX (close when clicking outside)
document.addEventListener("click", function (e) {
  const openDropdowns = document.querySelectorAll(".dropdown-menu.show");
  openDropdowns.forEach(menu => {
    if (!menu.parentElement.contains(e.target)) {
      const dropdownToggle = menu.parentElement.querySelector('[data-bs-toggle="dropdown"]');
      if (dropdownToggle) new bootstrap.Dropdown(dropdownToggle).hide();
    }
  });
});

// OPTIONAL: Close search box when resizing
window.addEventListener("resize", () => {
  if (window.innerWidth < 992 && toggleSearchBox)
    toggleSearchBox.style.display = "none";
});
// ===================== END OF NAVBAR INTERACTIONS =====================

document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".clinic-gallery img");
  const viewer = document.createElement("div");
  viewer.className = "image-viewer";
  viewer.innerHTML = `
    <div class="viewer-content">
      <span class="viewer-close">&times;</span>
      <img src="" class="viewer-img" alt="clinic">
      <div class="viewer-controls">
        <span class="viewer-prev">&#10094;</span>
        <span class="viewer-next">&#10095;</span>
      </div>
    </div>
  `;
  document.body.appendChild(viewer);

  const viewerImg = viewer.querySelector(".viewer-img");
  const closeBtn = viewer.querySelector(".viewer-close");
  const prevBtn = viewer.querySelector(".viewer-prev");
  const nextBtn = viewer.querySelector(".viewer-next");
  let currentIndex = 0;

  function openViewer(index) {
  currentIndex = index;
  viewer.classList.add("active");
  // Add image source slightly earlier and force reflow to remove lag
  viewerImg.src = galleryImages[currentIndex].src;
  void viewerImg.offsetWidth; // trigger reflow
  viewerImg.style.opacity = "1";
}

  function closeViewer() {
    viewer.classList.remove("active");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    viewerImg.src = galleryImages[currentIndex].src;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    viewerImg.src = galleryImages[currentIndex].src;
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openViewer(index));
  });

  closeBtn.addEventListener("click", closeViewer);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  viewer.addEventListener("click", e => {
    if (e.target === viewer) closeViewer();
  });

  document.addEventListener("keydown", e => {
    if (!viewer.classList.contains("active")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeViewer();
  });
});
// ===================== END OF IMAGE VIEWER =====================
document.querySelectorAll('.profile-tabs .nav-link').forEach(tab => {
  tab.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remove active class from tabs
    document.querySelectorAll('.profile-tabs .nav-link').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    
    // Show Overview content for all tabs
    const content = document.getElementById('overview');
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    content.classList.add('active');
  });
});
// ===================== END OF TABS CONTENT FIX =====================