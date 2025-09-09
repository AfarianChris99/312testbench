import './styles/main.css'
import { Router } from './router';
import { initNav } from './components/Nav';
import { Home } from './pages/Home';
import Project from './pages/Project';
import { initTicTacToe } from './projects/tictactoe/tictactoe';


const app = document.getElementById('app')!;
(document.getElementById('year') as HTMLElement).textContent = String(new Date().getFullYear());
initNav();

const router = new Router(app);
router.register({ path: '/', render: Home });
router.register({
    path: '/project',
    render: Project,
    onMount: () => {
        const mount = document.getElementById('tictactoe');
        if (mount){
            initTicTacToe(mount as HTMLElement);
        }
    }
});
