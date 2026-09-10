export function initDocumentModal() {
  const modal = document.querySelector('[data-js-document-modal]');
  const modalTitle = document.querySelector('[data-js-modal-title]');
  const modalSlider = document.querySelector('[data-js-modal-slider]');
  const modalFooter = document.querySelector('[data-js-modal-footer]');
  const downloadLink = document.querySelector('[data-js-modal-download-link]');
  const closeModalButton = document.querySelector('[data-js-modal-close]');

  // Находим контейнер, где лежат твои карточки документов
  const documentsContainer = document.querySelector('.documents-content');

  if (!modal || !modalTitle || !modalSlider || !closeModalButton || !documentsContainer) return;

  // Слушаем клики ТОЛЬКО внутри блока документов, не трогая глобальный DOM-поток
  documentsContainer.addEventListener('click', (event) => {
    const targetButton = event.target.closest('[data-js-open-document]');
    if (!targetButton) return;

    event.preventDefault();

    const title = targetButton.getAttribute('data-document-title');
    const pagesString = targetButton.getAttribute('data-document-pages');
    const pdfPath = targetButton.getAttribute('data-document-pdf');
    const pagesArray = pagesString ? pagesString.split(',') : [];

    modalTitle.textContent = title;
    modalSlider.innerHTML = pagesArray.map((pagePath, index) => `
      <div class="document-modal__slide">
        <picture>
          <img class="document-modal__image" src="${pagePath}" alt="${title} — Страница ${index + 1}" loading="lazy">
        </picture>
      </div>
    `).join('');

    if (pdfPath && modalFooter && downloadLink) {
      modalFooter.style.display = 'flex';
      downloadLink.setAttribute('href', pdfPath);
      downloadLink.setAttribute('download', `${title.replace(/\s+/g, '_')}.pdf`);
    } else if (modalFooter) {
      modalFooter.style.display = 'none';
    }

    modal.showModal();
  });

  closeModalButton.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
}

