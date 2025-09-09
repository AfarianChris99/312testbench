import './styles/main.css';
import { Router } from './router';
import { initNav } from './components/Nav';
import { Home } from './pages/Home';
import Project from './pages/Project';
import { initTicTacToe } from './projects/tictactoe/tictactoe';
import { initCalculator } from './projects/calculator/calculator'
import Team from './pages/Team';
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