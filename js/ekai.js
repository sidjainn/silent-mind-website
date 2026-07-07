// Ek-ai site - theme toggle + placeholder-link guard.
window.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const KEY = 'ekaiTheme';

  function apply(theme){
    root.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    localStorage.setItem(KEY, theme);
  }

  const saved = localStorage.getItem(KEY);
  if (saved) apply(saved);
  else apply(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  if (toggle) toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(KEY)) apply(e.matches ? 'dark' : 'light');
    });
  }

  // Guard un-wired placeholder links until real URLs are dropped in.
  document.querySelectorAll('[data-placeholder="true"]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      el.textContent = el.classList.contains('btn') ? 'Form link coming soon' : 'Contact - coming soon';
      el.style.opacity = '0.7';
    });
  });
});
