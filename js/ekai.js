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
});
