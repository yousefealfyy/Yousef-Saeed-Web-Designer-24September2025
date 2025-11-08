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
const ctx = document.getElementById('weeklyOverviewChart').getContext('2d');
        const weeklyOverviewChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Appointments',
                    data: [12, 19, 8, 15, 10, 7, 9],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
// ===================== END OF WEEKLY OVERVIEW CHART =====================
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Sales',
            data: [1200, 1900, 1700, 2200, 2000, 2400, 2300],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'New Users',
            data: [15, 22, 18, 30, 25, 35, 20],
            backgroundColor: 'rgba(255, 99, 132, 0.7)'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});
// ===================== END OF LINE AND BAR CHARTS =====================