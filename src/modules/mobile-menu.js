export function initMobileMenu() {
  const burgerButton = document.querySelector('[data-js-svg-button]');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('[data-js-mobile-menu-navigation-link]');

  if (!burgerButton || !mobileMenu) return;

  // Твоя выверенная база для Focus Trap
  const firstMenuLink = mobileLinks.length > 0 ? mobileLinks[0] : null;
  const lastMenuLink = mobileLinks.length > 0 ? mobileLinks[mobileLinks.length - 1] : null;

  function updateMenuState(isOpen) {
    burgerButton.setAttribute('aria-expanded', isOpen);
    burgerButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  }

  // 1. Клик по бургеру (Убрали e.stopPropagation(), чтобы не ломать DOM-поток сайта)
  burgerButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-open');
    burgerButton.classList.toggle('is-open');

    const isOpen = mobileMenu.classList.contains('is-open');
    document.body.classList.toggle('no-scroll', isOpen);
    updateMenuState(isOpen);
  });

  // 2. Закрытие меню автоматически при клике на ссылку (Важно для удобства навигации)
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      burgerButton.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      updateMenuState(false);
    });
  });

  // 3. Глобальный клик закрытия "мимо меню" (Добавили жесткую b2b-защиту от коллизий с модалкой)
  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('is-open')) return;

    // Меню закрывается, ТОЛЬКО если кликнули мимо бургера, мимо самого меню И мимо кнопок открытия документов
    const isBurgerClick = e.target.closest('#burger-button');
    const isMenuClick = e.target.closest('#mobile-menu');
    const isDocumentButtonClick = e.target.closest('[data-js-open-document]');

    if (!isBurgerClick && !isMenuClick && !isDocumentButtonClick) {
      mobileMenu.classList.remove('is-open');
      burgerButton.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      updateMenuState(false);
    }
  });

  // 4. Логика клавиатуры: Escape и твоя ловушка фокуса (Focus Trap) сохранена на 100%
  document.addEventListener('keydown', (e) => {
    if (!mobileMenu.classList.contains('is-open')) return;

    // Закрытие по кнопке Escape
    if (e.key === 'Escape') {
      mobileMenu.classList.remove('is-open');
      burgerButton.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      updateMenuState(false);
      burgerButton.focus();
      return;
    }

    // Зацикливание фокуса при нажатии Tab
    if (e.key === 'Tab' && firstMenuLink && lastMenuLink) {
      // Если идем назад (Shift + Tab) и стоим на бургер-кнопке
      if (e.shiftKey && document.activeElement === burgerButton) {
        e.preventDefault();
        lastMenuLink.focus(); // Перекидываем фокус на последнюю ссылку "Контакты"
      }
      // Если идем вперед (просто Tab) и стоим на ссылке "Контакты"
      else if (!e.shiftKey && document.activeElement === lastMenuLink) {
        e.preventDefault();
        burgerButton.focus(); // Возвращаем фокус на бургер-кнопку
      }
    }
  });
}