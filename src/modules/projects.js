import projectsData from '../data/projects.json';

const projectsContainer = document.querySelector('[data-js-projects-container]');
const filterButtons = document.querySelectorAll('[data-js-filter-button]');

function createProjectCardHtml(project) {
  const typeText = project.type === 'repair' ? 'Капитальный ремонт' : 'Новое строительство';
  return `
    <article class="card project-card">
      <div class="project-card__header">
        <span class="project-card__type">${typeText}</span>
        <span class="project-card__year">${project.year}</span>
      </div>
      <h3 class="card__title">${project.title}</h3>
      <div class="project-card__location">
        <svg class="i-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span class="project-card__location-text">${project.location}</span>
      </div>
    </article>
  `;
}

function renderProjects(projects) {
  if (!projectsContainer) return;
  projectsContainer.innerHTML = '';
  const cardsHtml = projects.map(project => createProjectCardHtml(project)).join('');
  projectsContainer.innerHTML = cardsHtml;
}

export function initProjectsRegistry() {
  if (!projectsContainer) return;

  // Первая отрисовка базы объектов
  renderProjects(projectsData);

  if (filterButtons.length === 0) return;
  filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      filterButtons.forEach(btn => btn.classList.remove('project-filters__button--active'));
      button.classList.add('project-filters__button--active');

      const selectedFilter = button.getAttribute('data-filter');
      if (selectedFilter === 'all') {
        renderProjects(projectsData);
      } else {
        const filteredProjects = projectsData.filter(project => project.type === selectedFilter);
        renderProjects(filteredProjects);
      }
    });
  });
}
