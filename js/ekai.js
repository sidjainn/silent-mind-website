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
