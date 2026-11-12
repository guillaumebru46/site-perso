const modal = document.querySelector('.proof-modal');
const modalImage = modal?.querySelector('img');

document.querySelectorAll('[data-proof]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!modal || !modalImage) return;
    modalImage.src = button.dataset.proof;
    modalImage.alt = button.dataset.alt || 'Capture du comparatif';
    modal.showModal();
  });
});

modal?.querySelector('.proof-close')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

const legalModal = document.querySelector('.legal-modal');
document.querySelector('[data-open-legal]')?.addEventListener('click', () => legalModal?.showModal());
legalModal?.querySelector('[data-close-legal]')?.addEventListener('click', () => legalModal.close());
legalModal?.addEventListener('click', (event) => {
  if (event.target === legalModal) legalModal.close();
});

document.querySelectorAll('.mobile-nav nav a').forEach((link) => {
  link.addEventListener('click', () => link.closest('details')?.removeAttribute('open'));
});

const savingsCounter = document.querySelector('[data-count-target]');
if (savingsCounter && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const target = Number(savingsCounter.dataset.countTarget);
  const format = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    const start = performance.now();
    const duration = 1650;
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      savingsCounter.textContent = `${format.format(target * eased)} €`;
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, { threshold: 0.35 });
  observer.observe(savingsCounter);
}
