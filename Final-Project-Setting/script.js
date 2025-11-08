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
  const breadcrumb = document.querySelector(".breadcrumb-bar");
  breadcrumb.style.opacity = "0";
  breadcrumb.style.transition = "opacity 0.8s ease";

  setTimeout(() => {
    breadcrumb.style.opacity = "1";
  }, 100);

  // Optional hover effect
  document.querySelectorAll(".breadcrumb-item a").forEach(link => {
    link.addEventListener("mouseover", () => link.style.color = "#0056b3");
    link.addEventListener("mouseout", () => link.style.color = "#007bff");
  });
});
// ===================== END OF BREADCRUMB ANIMATION =====================
const select = document.getElementById("availabilitySelect");
const options = document.getElementById("availabilityOptions");
const text = document.getElementById("availabilityText");

select.onclick = () => {
options.style.display = options.style.display === "block" ? "none" : "block";
};

options.querySelectorAll("li").forEach(item => {
item.onclick = () => {
    text.textContent = item.dataset.value;
    options.style.display = "none";
};
});

document.addEventListener("click", e => {
if (!select.contains(e.target)) options.style.display = "none";
});
// ===================== END OF CUSTOM SELECT =====================
document.addEventListener('DOMContentLoaded', () => {
  // Profile image
  const profileUpload = document.getElementById('profileUpload');
  const profilePreview = document.getElementById('profilePreview');
  const removeProfile = document.getElementById('removeProfile');
  profileUpload.addEventListener('change', e => {
    const file = e.target.files[0];
    if(file){
      profilePreview.src = URL.createObjectURL(file);
      profilePreview.style.display = 'block';
    }
  });
  removeProfile.addEventListener('click', () => {
    profilePreview.src = '';
    profilePreview.style.display = 'none';
    profileUpload.value = '';
  });

  // Languages tags
  const langInput = document.getElementById('langInput');
  const langContainer = document.getElementById('languageTags');
  langInput.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ','){
      e.preventDefault();
      const value = langInput.value.trim();
      if(value){
        const span = document.createElement('span');
        span.className = 'badge bg-primary me-1 mb-1';
        span.textContent = value;
        const close = document.createElement('span');
        close.innerHTML = '&times;';
        close.style.cursor = 'pointer';
        close.classList.add('ms-1');
        close.onclick = () => span.remove();
        span.appendChild(close);
        langContainer.insertBefore(span, langInput);
        langInput.value = '';
      }
    }
  });

  // Memberships
  const addMembershipBtn = document.getElementById('addMembership');
  const memberships = document.getElementById('memberships');
  addMembershipBtn.addEventListener('click', () => {
    const div = document.createElement('div');
    div.className = 'row g-2 membership-item align-items-center mb-2';
    div.innerHTML = `
      <div class="col-md-3"><input class="form-control" type="text" placeholder="Title"></div>
      <div class="col-md-8"><input class="form-control" type="text" placeholder="About Membership"></div>
      <div class="col-md-1"><button type="button" class="btn btn-danger btn-sm remove-membership">Delete</button></div>
    `;
    memberships.appendChild(div);
    div.querySelector('.remove-membership').addEventListener('click', () => div.remove());
  });
  document.querySelectorAll('.remove-membership').forEach(btn => btn.addEventListener('click', e => e.target.closest('.membership-item').remove()));

  // Education
  const addEducationBtn = document.getElementById('addEducation');
  const educationList = document.getElementById('educationList');
  const eduTemplate = document.getElementById('educationTemplate').content;

  addEducationBtn.addEventListener('click', () => {
    const clone = document.importNode(eduTemplate, true);
    // Logo upload inside education
    const uploadInput = clone.querySelector('.edu-upload');
    const img = clone.querySelector('img');
    const eduImgDiv = clone.querySelector('.edu-img');
    const removeBtn = clone.querySelector('.edu-remove');

    uploadInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if(file){
        img.src = URL.createObjectURL(file);
        img.style.display = 'block';
      }
    });
    removeBtn.addEventListener('click', () => {
      img.src = '';
      img.style.display = 'none';
      uploadInput.value = '';
    });
    // Reset button logic
    clone.querySelector('.edu-reset').addEventListener('click', () => {
      clone.querySelectorAll('input, textarea').forEach(el => el.value = '');
      img.src = '';
      img.style.display = 'none';
    });

    // Delete education
    clone.querySelector('.remove-education').addEventListener('click', e => {
      e.target.closest('.accordion-item').remove();
    });

    educationList.appendChild(clone);
  });
});
// ===================== END OF LINE AND BAR CHARTS =====================