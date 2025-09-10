import './styles/main.css';
import { Router } from './router';
import { initNav } from './components/Nav';
import { Home } from './pages/Home';
import Project from './pages/Project';
import { initTicTacToe } from './projects/tictactoe/tictactoe';
import { initCalculator } from './projects/calculator/calculator'
import Team from './pages/Team';
import Contact from './pages/Contact';
import { initUnitConverter } from './projects/unitcon/unitcon';
import { UnitConverterPage } from './pages/un'
const app = document.getElementById('app')!;
(document.getElementById('year') as HTMLElement).textContent = String(new Date().getFullYear());
initNav();
const router = new Router(app);
router.register({ path: '/', render: Home });
router.register({
  path: '/project',
  render: Project,
  onMount: () => {
    const ttt = document.getElementById('tictactoe');
    if (ttt) initTicTacToe(ttt as HTMLElement);

    const calc = document.getElementById('calculator');
    if (calc) initCalculator(calc as HTMLElement);
  }
});
router.register({path: '/team', render: Team});

router.register({
  path: '/unitconverter',
  render: UnitConverterPage,
  onMount: () => {
    // init against the app container or document
    initUnitConverter(document);
  }
});
router.register({
  path: '/contact',
  render: Contact,
  onMount: () => {
    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    const status = document.getElementById('contact-status') as HTMLParagraphElement | null;
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get('name') as string || '').trim();
      const email = (fd.get('email') as string || '').trim();
      const message = (fd.get('message') as string || '').trim();

      if (!name || !email || !message) {
        if (status) status.textContent = 'Please fill out all fields.';
        return;
      }
      const to = 'afarianchris@cityuniversity.edu'; 
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      if (status) status.textContent = 'Opening your email client…';
      form.reset();
    });
  }
});