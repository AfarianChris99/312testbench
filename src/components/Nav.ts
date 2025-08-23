export function initNav() {
  const btn = document.getElementById('menuBtn') as HTMLButtonElement | null;
  const nav = document.getElementById('nav') as HTMLElement | null;
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.dataset.open === 'true';
    nav.dataset.open = String(!isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
}
