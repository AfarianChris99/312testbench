export function initCalculator(root: HTMLElement){
    const KEYS: Array<{ label: string; act?: 'clear' | 'backspace' | 'eq'; op?: string}> = [
    { label: '7' }, { label: '8' }, { label: '9' }, { label: '÷', op: '/' },
    { label: '4' }, { label: '5' }, { label: '6' }, { label: 'x', op: '*' },
    { label: '1' }, { label: '2' }, { label: '3' }, { label: '-', op: '-' },
    { label: '0' }, { label: '.' }, { label: 'C', act: 'clear' }, { label: '+', op: '+' }, 
    ];

    let expr = '';
    let lastResult: string | null = null;

    root.innerHTML = `
     <div class="calc-wrap card">
      <div class="calc-status"></div>
      <input class="calc-display" type="text" inputmode="decimal" aria-label="Calculator display" />
      <div class="calc-grid" role="group" aria-label="Calculator keys"></div>
      <div class="calc-actions">
        <button class="calc-back" type="button">⌫</button>
        <button class="calc-eq"   type="button">=</button>
      </div>
    </div>
    `;
    
    const statusElement = root.querySelector<HTMLDivElement>('.calc-status')!;
    const gridElement   = root.querySelector<HTMLDivElement>('.calc-grid')!;
    const displayInput  = root.querySelector<HTMLInputElement>('.calc-display')!;
    const backButton    = root.querySelector<HTMLButtonElement>('.calc-back')!;
    const equalsButton  = root.querySelector<HTMLButtonElement>('.calc-eq')!;

    const evaluateSafe = (s: string): string => {
    const ok = /^[\d+\-*/().\s]+$/.test(s);
    if (!ok) return 'Err';
    try {
      const val = Function(`"use strict"; return (${s})`)();
      if (typeof val !== 'number' || !isFinite(val)) return 'Err';
      return String(val);
    } catch {
      return 'Err';
    }
  };

  const setStatus = () => {
    if (lastResult === 'Err') statusElement.textContent = 'Error';
    else if (lastResult !== null) statusElement.textContent = `Result: ${lastResult}`;
    else statusElement.textContent = 'Enter an expression';
  };
   const render = () => {
    // sync input
    displayInput.value = expr;

    gridElement.innerHTML = '';
    KEYS.forEach((k) => {
      const btn = document.createElement('button');
      btn.className = 'calc-key';
      btn.type = 'button';
      btn.textContent = k.label;
      if (k.act) btn.setAttribute('data-act', k.act);
      if (k.op)  btn.setAttribute('data-op', k.op);

      btn.addEventListener('click', () => {
        const act = btn.getAttribute('data-act');
        const op  = btn.getAttribute('data-op');

        if (act === 'clear') {
          expr = '';
          lastResult = null;
          render();
          return;
        }
        if (op) {
          expr += op;
          lastResult = null;
          render();
          return;
        }
     
        expr += (btn.textContent ?? '');
        lastResult = null;
        render();
      });

      gridElement.appendChild(btn);
    });

    setStatus();
  };

  backButton.addEventListener('click', () => {
    expr = expr.slice(0, -1);
    lastResult = null;
    render();
  });

  equalsButton.addEventListener('click', () => {
    lastResult = evaluateSafe(expr);
    expr = lastResult === 'Err' ? '' : lastResult;
    render();
  });


  displayInput.addEventListener('input', () => {
    expr = displayInput.value;
    lastResult = null;
    setStatus();
  });


  root.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); equalsButton.click(); }
    if (e.key === 'Escape') { expr = ''; lastResult = null; render(); }
    if (e.key === 'Backspace') { e.preventDefault(); backButton.click(); }
  });

  render();

}