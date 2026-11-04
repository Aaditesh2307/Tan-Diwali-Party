// Apply the saved theme before the styles load to avoid a bright flash.
(() => {
  let theme = 'dark';
  try {
    const saved = localStorage.getItem('diwali-showdown-theme');
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch { /* Theme selection still works without browser storage. */ }
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#171a19' : '#faf6ef';
})();
