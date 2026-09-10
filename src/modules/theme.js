export function initThemeToggle() {
  const themeSwitcher = document.querySelector('.theme-switcher');
  if (!themeSwitcher) return;

  themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
}
