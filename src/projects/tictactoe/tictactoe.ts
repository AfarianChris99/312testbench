
type Player = 'X' | 'O';
type Cell = Player | '';

export function initTicTacToe(root: HTMLElement){
const WIN = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

let board : Cell[] = Array(9).fill('');
let current: Player = 'X';
let winner: Player | 'Draw' | null = null;

root.innerHTML= `
<div class="ttt-wrap">
    <div class="ttt-status"></div>
    <div class="ttt-grid" role="grid"></div>
    <button class="ttt-reset" type"button">Reset</button>
</div>
`;

const statusElement = root.querySelector<HTMLDivElement>('.ttt-status')!;
const gridElement = root.querySelector<HTMLDivElement>('.ttt-grid')!;
const resetButton = root.querySelector<HTMLButtonElement>('.ttt-reset')!;

const calcWinner = (b: Cell[]) => {
    for (const [a,c,d] of WIN) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a] as Player;
    return b.every(Boolean) ? 'Draw' : null;
};

const setStatus = () => {
    statusElement.textContent = winner ? (winner === 'Draw' ? " Catscratch game" :`Winner: ${winner}`): `Turn: ${current}`;
};

const render = () => {
    gridElement.innerHTML = '';
    board.forEach((val: Cell, i: number) => {
        const btn = document.createElement('button');
        btn.className = 'ttt-cell';
        btn.type = 'button';
        btn.textContent = val;
        btn.disabled = !!val || !!winner;
        btn.addEventListener('click',() =>{
            if(winner || board[i]) return;
            board[i] = current;
            winner = calcWinner(board);
            if (!winner) current = current === 'X' ? 'O' : 'X';
            render();
        });
        gridElement.appendChild(btn);

    });
    setStatus();
};
resetButton.addEventListener('click', () => {
    board = Array(9).fill('');
    current = 'X';
    winner = null;
    render();
});
    render();
}

