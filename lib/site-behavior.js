/* ==========================================================
   Columbus Home Buyers
   1. Hero entrance + particle background
   2. Navigation (scroll state, mobile menu, active link)
   3. Scroll-in animations + stat counters
   4. Reviews carousel
   5. FAQ accordion
   6. Multi-step offer form
   7. Mobile sticky bar, footer year
   Runs once in the browser after React hydrates (see components/SiteBehavior.tsx).
   ========================================================== */

import { submitLead as saveLead } from "@/app/actions";

let initialized = false;

export function initSite() {
  // React dev mode runs effects twice; only bind listeners once.
  if (initialized) return;
  initialized = true;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Particles (hero entrance itself is pure CSS) ---------- */
  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const COLORS = ["79, 199, 168", "61, 127, 209", "255, 255, 255"];
    const LINK_DISTANCE = 130;
    const MOUSE_RADIUS = 160;

    let width = 0;
    let height = 0;
    let particles = [];
    let rafId = null;
    let heroVisible = true;
    const mouse = { x: null, y: null };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r = Math.random() * 1.8 + 0.6;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = Math.random() * 0.5 + 0.35;
      }

      update() {
        // Gentle push away from the cursor
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            this.x += (dx / dist) * force * 1.6;
            this.y += (dy / dist) * force * 1.6;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale particle count to screen area, capped for performance
      const count = Math.min(Math.floor((width * height) / 11000), 140);
      particles = Array.from({ length: count }, () => new Particle());
    };

    const drawLinks = () => {
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(120, 190, 220, ${(1 - dist / LINK_DISTANCE) * 0.22})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => { p.update(); p.draw(); });
      drawLinks();
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (rafId === null && heroVisible && !document.hidden && !prefersReducedMotion) {
        rafId = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    const hero = canvas.parentElement;
    hero.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = null; });

    // Pause when the tab is hidden or the hero is scrolled out of view
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      heroVisible ? start() : stop();
    }).observe(hero);

    resize();
    if (prefersReducedMotion) {
      particles.forEach((p) => p.draw());
      drawLinks();
    } else {
      start();
    }
  }

  /* ---------- 2. Navigation ---------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  const subnavLinks = document.getElementById("subnavLinks");
  const progress = document.getElementById("scrollProgress");
  const heroEl = document.getElementById("home");

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navToggle.querySelector("use").setAttribute("href", open ? "#i-x" : "#i-menu");
  };
  navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Scroll spy: the active section is the last one whose top has passed the header
  const navAnchors = [...navLinks.querySelectorAll('a[href^="#"]')];
  const subAnchors = [...subnavLinks.querySelectorAll("a")];
  const spyTargets = subAnchors
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);
  let activeId = null;

  const setActive = (id) => {
    if (id === activeId) return;
    activeId = id;
    [...navAnchors, ...subAnchors].forEach((a) =>
      a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`)
    );
    // Keep the active pill visible inside the horizontally scrolling bar
    const pill = subAnchors.find((a) => a.classList.contains("is-active"));
    if (pill) {
      const left = pill.offsetLeft - (subnavLinks.clientWidth - pill.offsetWidth) / 2;
      subnavLinks.scrollTo({ left, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    nav.classList.toggle("has-subnav", y > heroEl.offsetHeight - 140);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;

    const line = nav.offsetHeight + 24;
    let current = null;
    spyTargets.forEach((el) => { if (el.getBoundingClientRect().top <= line) current = el.id; });
    setActive(current);
  };
  const requestScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  };
  onScroll();
  window.addEventListener("scroll", requestScroll, { passive: true });
  window.addEventListener("resize", requestScroll);

  /* ---------- 3. Scroll-in animations + counters ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    if (prefersReducedMotion) { el.textContent = target.toFixed(decimals); return; }
    const duration = 1600;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const inViewObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll("[data-animate]").forEach((el) => inViewObserver.observe(el));

  /* ---------- 4. Reviews carousel ---------- */
  const track = document.getElementById("reviewTrack");
  if (track) {
    const buttons = document.querySelectorAll(".carousel__btn");
    const step = () => {
      const card = track.querySelector(".review");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card ? card.offsetWidth + gap : track.clientWidth;
    };
    const updateButtons = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      buttons[0].disabled = track.scrollLeft <= 2;
      buttons[1].disabled = track.scrollLeft >= max;
    };
    buttons.forEach((btn) =>
      btn.addEventListener("click", () => track.scrollBy({ left: step() * Number(btn.dataset.dir) }))
    );
    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();
  }

  /* ---------- 5. FAQ accordion ---------- */
  document.querySelectorAll(".faq__item").forEach((item) => {
    const q = item.querySelector(".faq__q");
    q.addEventListener("click", () => {
      const open = !item.classList.contains("is-open");
      document.querySelectorAll(".faq__item.is-open").forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("is-open", open);
      q.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- 6. Multi-step offer form ---------- */
  const form = document.getElementById("offerForm");
  if (form) {
    const steps = [...form.querySelectorAll(".fstep")];
    const total = steps.length;
    const bar = document.getElementById("formBar");
    const label = document.getElementById("formStepLabel");
    const back = document.getElementById("formBack");
    const success = document.getElementById("formSuccess");
    const listedNotice = document.getElementById("listedNotice");
    let current = 0;

    const showError = (name, show) => {
      const err = form.querySelector(`[data-error-for="${name}"]`);
      if (err) err.classList.toggle("is-shown", show);
      const input = form.elements[name];
      if (input && input.classList) input.classList.toggle("is-invalid", show);
    };

    const goTo = (index, backwards = false) => {
      steps[current].classList.remove("is-active", "is-back");
      current = index;
      const step = steps[current];
      step.classList.add("is-active");
      step.classList.toggle("is-back", backwards);
      bar.style.width = `${((current + 1) / total) * 100}%`;
      label.textContent = `Step ${current + 1} of ${total}`;
      back.hidden = current === 0;
      const focusable = step.querySelector("input:not([type=radio])");
      if (focusable && window.matchMedia("(min-width: 601px)").matches) focusable.focus({ preventScroll: true });
    };

    const validators = {
      address: (v) => v.trim().length >= 5,
      listed: (v) => v === "Yes" || v === "No",
      name: (v) => v.trim().split(/\s+/).length >= 2, // the Zapier step needs a last name
      phone: (v) => v.replace(/\D/g, "").replace(/^1/, "").length === 10,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    };

    const validateStep = (step) => {
      let ok = true;
      Object.keys(validators).forEach((name) => {
        if (!step.querySelector(`[name="${name}"]`)) return;
        const valid = validators[name](form.elements[name].value || "");
        showError(name, !valid);
        if (!valid) ok = false;
      });
      return ok;
    };

    // "Continue" buttons
    form.querySelectorAll("[data-next]").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (validateStep(steps[current]) && current < total - 1) goTo(current + 1);
      })
    );

    // Enter key on text inputs moves forward instead of submitting early
    form.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" || e.target.tagName !== "INPUT") return;
      const next = steps[current].querySelector("[data-next]");
      if (next) { e.preventDefault(); next.click(); }
    });

    // Option cards auto-advance (except on the "listed" step, which also has a price field)
    form.querySelectorAll('.option input[type="radio"]').forEach((radio) =>
      radio.addEventListener("change", () => {
        if (radio.name === "listed") {
          listedNotice.classList.toggle("is-shown", radio.value === "Yes");
          showError("listed", false);
          return;
        }
        setTimeout(() => { if (current < total - 1) goTo(current + 1); }, 280);
      })
    );

    // Light phone formatting: (614) 555-0123
    const phone = form.elements.phone;
    phone.addEventListener("input", () => {
      const d = phone.value.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
      phone.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
        : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d;
    });

    // Price with thousands separators
    const price = form.elements.price;
    price.addEventListener("input", () => {
      const d = price.value.replace(/\D/g, "").slice(0, 9);
      price.value = d ? Number(d).toLocaleString("en-US") : "";
    });

    // Clear errors as the user types
    form.querySelectorAll("input").forEach((input) =>
      input.addEventListener("input", () => showError(input.name, false))
    );

    back.addEventListener("click", () => { if (current > 0) goTo(current - 1, true); });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validateStep(steps[current])) return;

      const lead = Object.fromEntries(new FormData(form).entries());
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        await submitLead(lead);
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Try Again";
        document.getElementById("submitError").classList.add("is-shown");
        return;
      }

      steps[current].classList.remove("is-active");
      back.hidden = true;
      label.textContent = "All set";
      bar.style.width = "100%";
      document.getElementById("successName").textContent = lead.name.trim().split(" ")[0];
      success.hidden = false;
    });
  }

  /** Save the lead to Supabase via the server action; throws so the form shows its error state. */
  async function submitLead(lead) {
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].map((k) => [k, params.get(k) || ""])
    );
    const result = await saveLead({ ...lead, ...utm });
    if (!result.ok) throw new Error(result.error);
  }

  /* ---------- 6b. Video testimonials ---------- */
  const vids = [...document.querySelectorAll(".vid")];
  vids.forEach((fig) => {
    const video = fig.querySelector("video");
    const play = fig.querySelector(".vid__play");

    play.addEventListener("click", () => {
      // Only one testimonial plays at a time
      vids.forEach((other) => { if (other !== fig) other.querySelector("video").pause(); });
      video.controls = true;
      video.play();
    });
    video.addEventListener("play", () => fig.classList.add("is-playing"));
    video.addEventListener("ended", () => {
      fig.classList.remove("is-playing");
      video.controls = false;
      video.load(); // back to the poster frame
    });
  });

  /* ---------- 7. Mobile bar + footer year ---------- */
  const mobileBar = document.getElementById("mobileBar");
  const offerSection = document.getElementById("offer");
  if (mobileBar) {
    let offerInView = false;
    new IntersectionObserver(([entry]) => { offerInView = entry.isIntersecting; updateBar(); }, { threshold: 0.1 })
      .observe(offerSection);
    const updateBar = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      mobileBar.classList.toggle("is-shown", pastHero && !offerInView);
    };
    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();
  }

  document.getElementById("year").textContent = new Date().getFullYear();
}
