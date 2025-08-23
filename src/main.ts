import './styles/main.css'
import { Router } from './router';
import { initNav } from './components/Nav';
import { Home } from './pages/Home';

const app = document.getElementById('app')!;
(document.getElementById('year') as HTMLElement).textContent = String(new Date().getFullYear());
initNav();

const router = new Router(app);
router.register({ path: '/', render: Home });