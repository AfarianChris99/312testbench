// Unit Converter (TypeScript)
// Renders markup and provides an init() that wires up click handlers.
// IDs are prefixed with "uc-" to avoid collisions.

export function UnitConverter(): string {
  return /* html */ `
    <section class="container" id="uc-host">
      <h2>Unit Converter (TypeScript)</h2>
      <p>Convert between Celsius ↔ Fahrenheit and Meters ↔ Feet.</p>

      <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
        <!-- Temperature -->
        <div class="card">
          <h3>Temperature</h3>
          <label>Value <input type="number" id="uc-temp-value" step="any" /></label>
          <label>From
            <select id="uc-temp-from">
              <option value="C">Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
            </select>
          </label>
          <label>To
            <select id="uc-temp-to">
              <option value="F">Fahrenheit (°F)</option>
              <option value="C">Celsius (°C)</option>
            </select>
          </label>
          <button class="btn" id="uc-temp-convert" type="button">Convert</button>
          <output id="uc-temp-out" class="muted"></output>
        </div>

        <!-- Length -->
        <div class="card">
          <h3>Length</h3>
          <label>Value <input type="number" id="uc-len-value" step="any" /></label>
          <label>From
            <select id="uc-len-from">
              <option value="m">Meters (m)</option>
              <option value="ft">Feet (ft)</option>
            </select>
          </label>
          <label>To
            <select id="uc-len-to">
              <option value="ft">Feet (ft)</option>
              <option value="m">Meters (m)</option>
            </select>
          </label>
          <button class="btn" id="uc-len-convert" type="button">Convert</button>
          <output id="uc-len-out" class="muted"></output>
        </div>
      </div>
    </section>
  `;
}

export function initUnitConverter(scope: Document | HTMLElement = document): void {
  const root = scope instanceof Document ? scope : scope.ownerDocument ?? document;
  const host = root.querySelector('#uc-host') as HTMLElement | null;
  if (!host) return; // HTML not mounted yet

  // ---- Temperature
  const tVal  = host.querySelector('#uc-temp-value')   as HTMLInputElement | null;
  const tFrom = host.querySelector('#uc-temp-from')    as HTMLSelectElement | null;
  const tTo   = host.querySelector('#uc-temp-to')      as HTMLSelectElement | null;
  const tBtn  = host.querySelector('#uc-temp-convert') as HTMLButtonElement | null;
  const tOut  = host.querySelector('#uc-temp-out')     as HTMLOutputElement | null;

  tBtn?.addEventListener('click', () => {
    if (!tVal || !tFrom || !tTo || !tOut) return;
    const v = parseFloat(tVal.value);
    if (Number.isNaN(v)) { tOut.textContent = 'Enter a valid number'; return; }
    let res = v;
    if (tFrom.value === 'C' && tTo.value === 'F') res = v * 9/5 + 32;
    else if (tFrom.value === 'F' && tTo.value === 'C') res = (v - 32) * 5/9;
    tOut.textContent = `${v} °${tFrom.value} = ${res.toFixed(2)} °${tTo.value}`;
  });

  // ---- Length
  const lVal  = host.querySelector('#uc-len-value')   as HTMLInputElement | null;
  const lFrom = host.querySelector('#uc-len-from')    as HTMLSelectElement | null;
  const lTo   = host.querySelector('#uc-len-to')      as HTMLSelectElement | null;
  const lBtn  = host.querySelector('#uc-len-convert') as HTMLButtonElement | null;
  const lOut  = host.querySelector('#uc-len-out')     as HTMLOutputElement | null;

  lBtn?.addEventListener('click', () => {
    if (!lVal || !lFrom || !lTo || !lOut) return;
    const v = parseFloat(lVal.value);
    if (Number.isNaN(v)) { lOut.textContent = 'Enter a valid number'; return; }
    let res = v;
    if (lFrom.value === 'm' && lTo.value === 'ft') res = v * 3.280839895;
    else if (lFrom.value === 'ft' && lTo.value === 'm') res = v / 3.280839895;
    lOut.textContent = `${v} ${lFrom.value} = ${res.toFixed(4)} ${lTo.value}`;
  });
}