// Импортируем независимые b2b-модули
import { initProjectsRegistry } from './modules/projects.js';
import { initDocumentModal } from './modules/modal.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initThemeToggle } from './modules/theme.js';
import { initCompetencesRegistry } from './modules/competences.js';

// СКРОЛЛ ШАПКИ //

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 5) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

// ИНИЦИЛИЗАЦИЯ ФУНКЦИЙ

function init() {
  initProjectsRegistry();
  initDocumentModal();
  initHeaderScroll();
  initThemeToggle();
  initMobileMenu();
  initCompetencesRegistry()
}

init();
