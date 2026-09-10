import competencesData from '../data/competences.json';

// Цепляемся к data-js
const competencesContainer = document.querySelector('[data-js-competences-container]');

//Функция генерации HTML-карточки разделов //

function createCompetenceCardHtml(item) {
  return `
    <article class="card competence-card">
      <span class="competence-card__code">${item.code}</span>
      <h3 class="card__title competence-card__title">${item.title}</h3>
      <p class="competence-card__text">${item.description}</p>
    </article>
  `;
}

/* Главный метод рендеринга базы компетенций */

export function initCompetencesRegistry() {
  if (!competencesContainer) return;

  // Очищаем контейнер от старого HTML
  competencesContainer.innerHTML = '';

  // Штампуем флюидные b2b-карточки из JSON
  competencesContainer.innerHTML = competencesData.map(item => createCompetenceCardHtml(item)).join('');
}
