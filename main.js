// =====================
// NAV — scroll effect + hamburger
// =====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Đóng menu khi click link
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// =====================
// SCROLL REVEAL (Intersection Observer)
// =====================
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay dựa trên thứ tự trong parent
      const siblings = Array.from(entry.target.parentElement?.children || []);
      const idx = siblings.indexOf(entry.target);
      const delay = (idx * 80);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// =====================
// COUNTER ANIMATION
// =====================
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Easing out
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// =====================
// SKILL BAR ANIMATION
// =====================
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.bar-fill');
      fills.forEach((fill, i) => {
        setTimeout(() => {
          fill.style.width = fill.dataset.width + '%';
        }, i * 100);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(el => barObserver.observe(el));

// =====================
// SMOOTH SCROLL
// =====================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// =====================
// CONTACT FORM (demo — không backend thật)
// =====================
function handleSend() {
  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();
  const status = document.getElementById('form-status');
  const btn = document.getElementById('send-btn');

  if (!name || !email || !message) {
    status.textContent = '⚠️ Vui lòng điền đầy đủ thông tin!';
    status.style.color = '#f87171';
    return;
  }

  if (!email.includes('@')) {
    status.textContent = '⚠️ Email không hợp lệ!';
    status.style.color = '#f87171';
    return;
  }

  btn.textContent = 'Đang gửi...';
  btn.disabled = true;

  // Simulate send (replace with actual fetch to Apps Script khi deploy)
  setTimeout(() => {
    status.textContent = '✅ Gửi thành công! Nghĩa sẽ phản hồi trong vòng 24h.';
    status.style.color = '#34d399';
    btn.textContent = 'Gửi tin nhắn';
    btn.disabled = false;
    document.getElementById('form-name').value = '';
    document.getElementById('form-email').value = '';
    document.getElementById('form-message').value = '';
  }, 1200);
}

// =====================
// CURSOR GLOW (desktop only)
// =====================
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%);
    pointer-events: none; z-index: 0; transform: translate(-50%,-50%);
    transition: left 0.3s ease, top 0.3s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

console.log('%c[NVN] Portfolio loaded 🚀', 'color: #38bdf8; font-family: monospace; font-size: 14px;');
