// Ek-ai site - theme toggle. Light mode is the default; the toggle persists a choice.
window.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const KEY = 'ekaiTheme2';

  function apply(theme){
    root.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    localStorage.setItem(KEY, theme);
  }

  apply(localStorage.getItem(KEY) || 'light');

  if (toggle) toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  });

  // Scroll reveals: elements with [data-reveal] fade up when they enter the
  // viewport; siblings inside the same parent stagger by DOM order.
  const revealed = document.querySelectorAll('[data-reveal]');
  if (revealed.length && 'IntersectionObserver' in window) {
    const groups = new Map();
    revealed.forEach(el => {
      const parent = el.parentElement;
      const i = groups.get(parent) || 0;
      el.style.setProperty('--rd', `${Math.min(i, 5) * 90}ms`);
      groups.set(parent, i + 1);
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealed.forEach(el => io.observe(el));
  } else {
    revealed.forEach(el => el.classList.add('in'));
  }

  // Scatter cards settle into a brief once the problem block scrolls into view.
  const scatter = document.querySelector('.scatter[data-settle]');
  if (scatter) {
    let done = false;
    const check = () => {
      if (done) return;
      const r = scatter.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.72 && r.bottom > 0) {
        done = true;
        window.removeEventListener('scroll', check);
        setTimeout(() => scatter.classList.add('settled'), 350);
      }
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
  }
});
