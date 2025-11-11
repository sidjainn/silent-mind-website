// Shared client behavior. Wrapped in DOMContentLoaded to avoid race conditions.
window.addEventListener('DOMContentLoaded', ()=>{
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
  
    function applyTheme(theme){
      if(theme === 'dark') root.setAttribute('data-theme','dark');
      else root.removeAttribute('data-theme');
      localStorage.setItem('silentMindTheme', theme);
    }
  
    const saved = localStorage.getItem('silentMindTheme');
    if(saved) applyTheme(saved);
    else{
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  
    if(themeToggle) themeToggle.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  
    if(window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e=>{
        const saved = localStorage.getItem('silentMindTheme');
        if(!saved) applyTheme(e.matches ? 'dark' : 'light');
      });
    }
  
    // form handling for join page
    const form = document.getElementById('interestForm');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const fd = new FormData(e.target);
        const entry = Object.fromEntries(fd.entries());
        const saved = JSON.parse(localStorage.getItem('silentMindInterest')||'[]');
        saved.push({...entry, time:new Date().toISOString()});
        localStorage.setItem('silentMindInterest', JSON.stringify(saved));
        const msg = document.getElementById('formMsg');
        if(msg) msg.textContent = 'Thanks. Your response is saved locally. Replace form handler with email or backend to collect responses.';
        e.target.reset();
      });
    }
  });