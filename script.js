gsap.registerPlugin(ScrollTrigger);

// HERO ANIMATION
gsap.to(".reveal-text", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.2
});

// SCROLL ANIMATIONS
gsap.utils.toArray(".card").forEach(card => {
  gsap.from(card, {
    scrollTrigger: card,
    opacity: 0,
    y: 40,
    duration: 0.8
  });
});

// MODAL SYSTEM
function openModal(project) {
  const modal = document.getElementById("modal");
  const body = document.getElementById("modal-body");

  if (project === "sqin") {
    body.innerHTML = "<h2>SQIN MED Case Study</h2><p>Full clinical luxury redesign with conversion UX system.</p>";
  }

  if (project === "pmu") {
    body.innerHTML = "<h2>La PMUA Niagara</h2><p>High-end PMU branding + booking funnel system.</p>";
  }

  if (project === "shop") {
    body.innerHTML = "<h2>SQIN MED Shop</h2><p>Shopify e-commerce system + 24/7 revenue stream.</p>";
  }

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// BEFORE/AFTER SLIDER
const slider = document.querySelector(".range");

if (slider) {
  slider.addEventListener("input", (e) => {
    document.querySelector(".after").style.clipPath =
      `inset(0 ${100 - e.target.value}% 0 0)`;
  });
}
