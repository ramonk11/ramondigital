const splitTargets = document.querySelectorAll("[data-split]");

splitTargets.forEach((target) => {
  const words = target.textContent.trim().split(/\s+/);
  target.textContent = "";

  words.forEach((word, index) => {
    const wrapper = document.createElement("span");
    wrapper.className = "word";
    const inner = document.createElement("span");
    inner.textContent = word;
    inner.style.transitionDelay = `${Math.min(index * 26, 520)}ms`;
    wrapper.appendChild(inner);
    target.appendChild(wrapper);

    if (index < words.length - 1) {
      target.append(" ");
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll(".reveal, [data-split]").forEach((element) => {
  revealObserver.observe(element);
});

const floaters = document.querySelectorAll("[data-float]");

window.addEventListener(
  "scroll",
  () => {
    const progress = window.scrollY * 0.05;
    floaters.forEach((element) => {
      element.style.transform = `translate3d(0, ${progress}px, 0)`;
    });
  },
  { passive: true }
);

const scrollDolphins = document.querySelectorAll(".scroll-dolphin");

const rotateScrollDolphins = () => {
  const rotation = window.scrollY * 0.18;

  scrollDolphins.forEach((dolphin) => {
    dolphin.style.transform = `rotate(${rotation}deg)`;
  });
};

rotateScrollDolphins();
window.addEventListener("scroll", rotateScrollDolphins, { passive: true });
window.addEventListener("load", rotateScrollDolphins);
window.addEventListener("pageshow", rotateScrollDolphins);

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.14}px, ${y * 0.18}px)`;
  });

  button.addEventListener("pointerleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

document.querySelectorAll(".case-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1200px) rotateX(${y * -3}deg) rotateY(${x * 4}deg) translateY(-8px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
