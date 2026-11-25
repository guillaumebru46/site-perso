const film = document.querySelector('.accueil-film');
const toggle = document.querySelector('.film-toggle');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
function updateButton() {
  toggle.hidden = false;
  toggle.textContent = film.paused ? '▶' : 'Ⅱ';
  toggle.setAttribute('aria-label', film.paused ? 'Lire la vidéo' : 'Mettre la vidéo en pause');
}
function playFilm() {
  if (!film.getAttribute('src')) film.src = film.dataset.src;
  film.play().catch(updateButton);
}
film.addEventListener('play', updateButton);
film.addEventListener('pause', updateButton);
toggle.addEventListener('click', () => film.paused ? playFilm() : film.pause());
function syncMotion() {
  if (motion.matches) { film.pause(); updateButton(); }
  else playFilm();
}
motion.addEventListener('change', syncMotion);
syncMotion();
