import {initTicTacToe} from '../projects/tictactoe/tictactoe';
export default function Projec(root: HTMLElement){
    root.innerHTML = `
    <h1>Projects</h1>
    <p> Here's a few fun things we made.</p>
    
    <section>
        <h2> Tic-tac-toe</h2>
        <div id='tictactoe"></div>
    </section>
    `;
    const mount = root.querySelector('#tictactoe') as HTMLElement;
    initTicTacToe(mount);
}