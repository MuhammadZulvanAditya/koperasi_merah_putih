document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const customNavbar = document.querySelector(".custom-navbar") || navbar;
  const navbarId = document.getElementById("navbar");
  const countdownEl = document.getElementById("countdown");
  const launch = new Date("2025-07-12T00:00:00");
  let lastScrollTop = 0;

  const updateCountdown = () => {
    const now = new Date();
    const diff = launch - now;
    if (diff < 0) {
      countdownEl.textContent = "Sudah berlangsung!";
      clearInterval(interval);
      return;
    }
    const d = String(Math.floor(diff / 864e5)).padStart(2, "0");
    const h = String(Math.floor((diff % 864e5) / 36e5)).padStart(2, "0");
    const m = String(Math.floor((diff % 36e5) / 6e4)).padStart(2, "0");
    const s = String(Math.floor((diff % 6e4) / 1000)).padStart(2, "0");
    countdownEl.textContent = `${d} hari ${h}:${m}:${s}`;
  };
  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (navbarId) {
      navbarId.classList.toggle("scrolled", scrollY > 50);
    }

    if (navbar) {
      navbar.classList.toggle("bg-dark", scrollY > 50);
      navbar.classList.toggle("shadow-sm", scrollY > 50);
    }

    if (customNavbar) {
      if (scrollY > 60) {
        customNavbar.classList.add("navbar-scrolled");
      } else {
        customNavbar.classList.remove("navbar-scrolled");
      }
    }

    const direction = scrollY > lastScrollTop ? "down" : "up";
    lastScrollTop = scrollY <= 0 ? 0 : scrollY;

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;

      if (isVisible) {
        el.classList.remove("active-up", "active-down");
        el.classList.add(direction === "down" ? "active-down" : "active-up");
      } else {
        el.classList.remove("active-up", "active-down");
      }
    });
  });
});
