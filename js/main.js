// АН «Квадрат» — интерактив сайта
(() => {
  // Мобильное меню
  const menu = document.getElementById("mobileMenu");
  document.querySelector(".header .burger").addEventListener("click", () => menu.classList.add("open"));
  menu.querySelector(".mobile-menu__close").addEventListener("click", () => menu.classList.remove("open"));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("open")));

  // Окно заявки
  const modal = document.getElementById("modal");
  const openModal = () => { modal.classList.remove("done"); modal.classList.add("open"); };
  const closeModal = () => modal.classList.remove("open");
  document.querySelectorAll("[data-modal]").forEach((b) => b.addEventListener("click", openModal));
  modal.querySelector(".modal__close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // Маска телефона
  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    input.addEventListener("input", () => {
      let d = input.value.replace(/\D/g, "");
      if (d.startsWith("8")) d = "7" + d.slice(1);
      if (!d.startsWith("7")) d = "7" + d;
      d = d.slice(0, 11);
      let out = "+7";
      if (d.length > 1) out += " (" + d.slice(1, 4);
      if (d.length >= 4) out += ") " + d.slice(4, 7);
      if (d.length >= 7) out += "-" + d.slice(7, 9);
      if (d.length >= 9) out += "-" + d.slice(9, 11);
      input.value = out;
    });
  });

  // Заявки пока никуда не отправляются: здесь нужно подключить отправку (почта, Telegram или CRM)
  document.querySelectorAll(".lead-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.reset();
      if (form.closest(".modal")) { modal.classList.add("done"); return; }
      modal.classList.add("open", "done");
    });
  });

  // Слайдер объектов
  const track = document.getElementById("objectsTrack");
  document.querySelectorAll("[data-slide]").forEach((b) => b.addEventListener("click", () => {
    const card = track.querySelector(".obj");
    track.scrollBy({ left: Number(b.dataset.slide) * (card.offsetWidth + 20), behavior: "smooth" });
  }));

  // Счётчики
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 1400, 1);
      const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString("ru-RU") + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Появление при прокрутке
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("visible");
      en.target.querySelectorAll("[data-count]").forEach(animateCount);
      io.unobserve(en.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
