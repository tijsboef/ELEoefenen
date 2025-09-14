// --- All Interactive Logic (JavaScript) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Global Animation Controller ---
    window.currentAnimationId = null;

    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-block');

    // --- Sidebar Toggle for Mobile ---
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('is-open');
    });

    // --- Sidebar Link Click Logic ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('is-open');
                }
            }
        });
    });

    // --- Highlight Active Nav Link on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: "-40% 0px -60% 0px" });

    sections.forEach(section => { observer.observe(section); });


    // --- Metaphor Explanation Logic ---
    const metaphorCards = document.querySelectorAll('.card-hover');
    const explanationContainer = document.getElementById('explanation-content');
    
    const explanations = {
        mnm: {
            html: `
              <h4>🍫 M&M-fabriek</h4>
              <p><b>Spanning (U):</b> Aantal M&M’s per vrachtwagen (energie per lading).</p>
              <p><b>Stroom (I):</b> Aantal vrachtwagens per seconde.</p>
              <p><b>Vermogen (P):</b> Totaal aantal M&M’s dat per seconde aankomt.</p>
              
              <div class="interactive-controls">
                   <button id="mnm-toggle" aria-pressed="false">🔓 Slagboom open (geen stroom)</button>
                   <label for="mnm-speed">Snelheid (I):</label>
                   <input id="mnm-speed" type="range" min="0" max="100" value="45" />
                   <span id="mnm-speedVal" class="interactive-hint">45</span>
              </div>
              
              <div class="svg-wrap">
                  <svg id="mnm-scene" viewBox="0 0 960 540">
                       <defs>
                          <marker id="mnm-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" class="mnm-arrow" /></marker>
                          <g id="mnm-truck"><rect x="-30" y="-12" width="60" height="24" rx="4" ry="4" fill="#4ee68a" stroke="#1a7a43" stroke-width="2"/><rect x="18" y="-16" width="28" height="32" rx="4" ry="4" fill="#7ff0b2" stroke="#1a7a43" stroke-width="2"/><rect x="24" y="-10" width="12" height="10" rx="2" fill="#dff" stroke="#8ac" stroke-width="1"/><circle cx="-15" cy="14" r="8" fill="#222"/><circle cx="15" cy="14" r="8" fill="#222"/><circle cx="-15" cy="14" r="4" fill="#888"/><circle cx="15" cy="14" r="4" fill="#888"/><circle cx="-14" cy="-4" r="4" fill="#e33"/><circle cx="-4" cy="-6" r="4" fill="#f4b400"/><circle cx="6" cy="-4" r="4" fill="#4285f4"/></g>
                          <g id="mnm-shop"><circle cx="0" cy="0" r="40" fill="#fff7c2" stroke="#d4b200" stroke-width="6"/><path d="M -18 10 Q 0 28 18 10" fill="none" stroke="#d4b200" stroke-width="6" stroke-linecap="round"/><path d="M -22 -6 L 22 -6" stroke="#d4b200" stroke-width="6" stroke-linecap="round"/><rect x="-50" y="50" width="100" height="60" rx="8" fill="#ffd54f" stroke="#cc9a00" stroke-width="5"/><rect x="-36" y="60" width="32" height="28" fill="#fff" stroke="#cc9a00" stroke-width="4"/><rect x="6" y="60" width="32" height="28" fill="#fff" stroke="#cc9a00" stroke-width="4"/><text x="0" y="-56" text-anchor="middle" class="mnm-label">Winkel (lamp)</text><text x="0" y="130" text-anchor="middle" class="mnm-small">Zet energie om → licht &amp; warmte (P, E)</text></g>
                          <g id="mnm-factory"><rect x="-70" y="-60" width="140" height="120" rx="10" fill="#cfd8dc" stroke="#607d8b" stroke-width="6"/><rect x="-20" y="-80" width="40" height="20" rx="4" fill="#90a4ae" stroke="#607d8b" stroke-width="6"/><line x1="-30" y1="0" x2="-6" y2="0" stroke="#1b5e20" stroke-width="6"/><line x1="6" y1="0" x2="30" y2="0" stroke="#b71c1c" stroke-width="6"/><text x="0" y="-70" text-anchor="middle" class="mnm-label">Fabriek (batterij)</text><text x="0" y="70" text-anchor="middle" class="mnm-small">Energie per vrachtwagen = U (volt)</text><text x="-38" y="8" text-anchor="end" class="mnm-small">−</text><text x="38" y="8" class="mnm-small">+</text></g>
                      </defs>
                      <path d="M 160 140 H 360" class="mnm-road"/><path d="M 420 140 H 800" class="mnm-road" marker-end="url(#mnm-arrowhead)"/><path d="M 800 140 V 380" class="mnm-road" marker-end="url(#mnm-arrowhead)"/><path d="M 800 380 H 160" class="mnm-road" marker-end="url(#mnm-arrowhead)"/><path d="M 160 380 V 140" class="mnm-road" marker-end="url(#mnm-arrowhead)"/>
                      <line id="mnm-bridge" x1="360" y1="140" x2="420" y2="140" stroke="#dc2626" stroke-width="10" stroke-linecap="round" opacity="0"/>
                      <use href="#mnm-factory" x="160" y="260"/><g transform="translate(800,240)"><use href="#mnm-shop"/></g>
                      <g id="mnm-fleet"></g>
                      <text x="520" y="120" class="mnm-label">Stroom (I) = vrachtwagens per seconde</text>
                      <text x="160" y="430" class="mnm-label">Spanning (U) = energie per vrachtwagen</text>
                      <text x="800" y="430" text-anchor="end" class="mnm-label">Vermogen (P) = U × I</text>
                  </svg>
              </div>
              <p class="interactive-hint" style="margin-top:10px">Didactische hint: zet de slagboom open (🔓) → vraag: <em>waarom stopt de stroom (I)?</em> Zet hem dicht (🔒) → vergroot snelheid: <em>wat betekent een grotere I voor P = U×I?</em></p>
              `,
            init: function() {
                if (document.getElementById('mnm-scene').dataset.initialized) return;
                document.getElementById('mnm-scene').dataset.initialized = 'true';

                const btn = document.getElementById('mnm-toggle'), speed = document.getElementById('mnm-speed'), speedVal = document.getElementById('mnm-speedVal'),
                bridge= document.getElementById('mnm-bridge'), fleet = document.getElementById('mnm-fleet');
                
                const x1=160, y1=140, x2=800, y2=380;
                const Ltop = x2-x1, Lright=y2-y1, Lbottom=x2-x1, Lleft=y2-y1;
                const pathLen = Ltop + Lright + Lbottom + Lleft;

                const TRUCKS = 5, trucks = [];
                for (let i=0;i<TRUCKS;i++){
                    const use = document.createElementNS('http://www.w3.org/2000/svg','use');
                    use.setAttributeNS('http://www.w3.org/1999/xlink','href','#mnm-truck');
                    fleet.appendChild(use);
                    trucks.push({ el: use, s: (i/TRUCKS) * pathLen });
                }
                
                let running = false, lastT = null;
                
                function getPointAt(totalS){
                    let s = ((totalS % pathLen) + pathLen) % pathLen;
                    if (s <= Ltop) return { x: x1 + s, y: y1, ang: 0 };
                    s -= Ltop;
                    if (s <= Lright) return { x: x2, y: y1 + s, ang: 90 };
                    s -= Lright;
                    if (s <= Lbottom) return { x: x2 - s, y: y2, ang: 180 };
                    s -= Lbottom;
                    return { x: x1, y: y2 - s, ang: 270 };
                }
                
                function renderTrucks(){ for (const t of trucks){ const p = getPointAt(t.s); t.el.setAttribute('transform', `translate(${p.x},${p.y}) rotate(${p.ang})`); } }
                
                function step(ts){
                    if (!lastT) lastT = ts;
                    const dt = (ts - lastT) / 1000;
                    lastT = ts;
                    if (running){
                        const v = (parseInt(speed.value,10) || 0) * 3;
                        for (const t of trucks) t.s += v * dt;
                        renderTrucks();
                    }
                    window.currentAnimationId = requestAnimationFrame(step);
                }
                
                function updateBridge(){
                    bridge.setAttribute('opacity', running ? '1' : '0');
                    btn.setAttribute('aria-pressed', running);
                    btn.textContent = running ? '🔒 Slagboom dicht (stroom loopt)' : '🔓 Slagboom open (geen stroom)';
                }
                
                btn.addEventListener('click', () => { running = !running; updateBridge(); });
                speed.addEventListener('input', () => { speedVal.textContent = speed.value; });
                
                renderTrucks(); updateBridge(); speedVal.textContent = speed.value; 
                window.currentAnimationId = requestAnimationFrame(step);
            }
        },
        water: {
            html: `
              <h4>💧 Waterleiding</h4>
              <p><b>Spanning (U):</b> De waterdruk.</p>
              <p><b>Stroom (I):</b> Aantal liters water dat per seconde stroomt.</p>
              <p><b>Vermogen (P):</b> De totale waterkracht per seconde.</p>

              <div class="interactive-controls">
                   <button id="water-toggle" class="water-btn" aria-pressed="false">🔒 Kraan dicht (geen stroming)</button>
                   <label for="water-speed"><strong>Stroomsnelheid I</strong>:</label>
                   <input id="water-speed" type="range" min="0" max="100" value="40" />
                   <span id="water-speedVal" class="interactive-hint">40</span>
              </div>

              <div class="svg-wrap">
                  <svg id="water-scene" viewBox="0 0 960 540">
                       <defs>
                          <g id="water-drop"><ellipse cx="0" cy="0" rx="6" ry="8" fill="#0ea5e9" stroke="#0369a1" stroke-width="1.5"/><circle cx="2" cy="-2" r="1.6" fill="#e0f2fe"/></g>
                          <g id="water-reservoir"><rect x="-70" y="-70" width="140" height="140" rx="12" fill="#e2e8f0" stroke="#64748b" stroke-width="6"/><clipPath id="water-waterclip"><rect x="-66" y="-66" width="132" height="132" rx="10"/></clipPath><g clip-path="url(#water-waterclip)"><rect x="-66" y="10" width="132" height="56" fill="#93c5fd"/><path d="M-66,10 Q-50,2 -34,10 T0,10 T34,10 T68,10" fill="none" stroke="#60a5fa" stroke-width="6"/></g><text x="0" y="-84" text-anchor="middle" class="water-label">Reservoir (batterij)</text><text x="0" y="90" text-anchor="middle" class="water-small">U = waterdruk (spanning)</text><text x="-42" y="0" text-anchor="end" class="water-small">lage druk −</text><text x="42" y="0" class="water-small">+ hoge druk</text></g>
                          <g id="water-valve"><line x1="-60" y1="0" x2="60" y2="0" class="water-pipeFaint"/><line id="water-valveBar" x1="-10" y1="0" x2="10" y2="0" stroke="#ef4444" stroke-width="12" stroke-linecap="round"/><circle cx="0" cy="0" r="8" fill="#ef4444"/><text x="0" y="-46" text-anchor="middle" class="water-label">Kraan = schakelaar</text><text x="0" y="28" text-anchor="middle" class="water-small">Open = stroming • Dicht = stil</text></g>
                          <g id="water-turbine"><circle id="water-lampGlow" cx="0" cy="0" r="52" fill="#fff3a3" opacity="0.15"/><g id="water-wheel"><circle cx="0" cy="0" r="36" fill="#e5e7eb" stroke="#475569" stroke-width="6"/><g fill="#60a5fa" stroke="#1e3a8a" stroke-width="2"><rect x="-8" y="-44" width="16" height="18" rx="3"/><rect x="-8" y="26" width="16" height="18" rx="3"/><rect x="-44" y="-8" width="18" height="16" rx="3"/><rect x="26" y="-8" width="18" height="16" rx="3"/><rect x="-33" y="-33" width="16" height="16" rx="3" transform="rotate(45)"/><rect x="-33" y="17" width="16" height="16" rx="3" transform="rotate(45)"/><rect x="17" y="-33" width="16" height="16" rx="3" transform="rotate(45)"/><rect x="17" y="17" width="16" height="16" rx="3" transform="rotate(45)"/></g><circle cx="0" cy="0" r="6" fill="#0ea5e9"/></g><text x="0" y="-64" class="water-label" text-anchor="middle">Watermolen → lamp</text><text x="0" y="88" class="water-small" text-anchor="middle">Vermogen P = U × I</text></g>
                      </defs>
                      <text x="480" y="36" text-anchor="middle" class="water-label" font-weight="700">Waterslang — doorstroming als stroom I</text>
                      <path d="M 160 140 H 360" class="water-pipe"/><use href="#water-valve" x="390" y="140"/><path d="M 420 140 H 800" class="water-pipe"/>
                      <path d="M 800 140 V 380" class="water-pipe"/><path d="M 800 380 H 160" class="water-pipe"/><path d="M 160 380 V 140" class="water-pipe"/>
                      <use href="#water-reservoir" x="160" y="260"/><g transform="translate(800,240)"><use href="#water-turbine"/></g>
                      <g id="water-stream"></g>
                      <text x="520" y="120" class="water-label">Stroom (I) = liters per seconde</text>
                      <text x="160" y="430" class="water-label">Spanning (U) = waterdruk</text>
                      <text x="800" y="430" text-anchor="end" class="water-label">P = U × I (lamp helderder bij grotere I)</text>
                  </svg>
              </div>

              <p class="interactive-hint">Tip: Open de kraan en schuif de snelheid op. Wat zie je gebeuren met de lamp en de molen bij hogere <strong>I</strong> (bij gelijke <strong>U</strong>)?</p>
              `,
            init: function() {
                if (document.getElementById('water-scene').dataset.initialized) return;
                document.getElementById('water-scene').dataset.initialized = 'true';

                const btn = document.getElementById('water-toggle'), speed = document.getElementById('water-speed'), speedVal = document.getElementById('water-speedVal'),
                stream = document.getElementById('water-stream'), lampGlow = document.getElementById('water-lampGlow'), 
                wheelGrp = document.getElementById('water-wheel'), valveBar = document.getElementById('water-valveBar');
                
                const x1=160, y1=140, x2=800, y2=380;
                const Ltop = x2-x1, Lright=y2-y1, Lbottom=x2-x1, Lleft=y2-y1;
                const L = Ltop+Lright+Lbottom+Lleft;

                const DROPS = 28, drops = [];
                for (let i=0;i<DROPS;i++){
                    const d = document.createElementNS('http://www.w3.org/2000/svg','use');
                    d.setAttributeNS('http://www.w3.org/1999/xlink','href','#water-drop');
                    stream.appendChild(d);
                    drops.push({el:d, s:(i/DROPS)*L});
                }
                
                let running = false, lastT = null, wheelAngle = 0;
                
                function pointAt(sTot){
                    let s = ((sTot%L)+L)%L;
                    if (s <= Ltop) return {x:x1+s, y:y1, ang:0};
                    s-=Ltop;
                    if (s <= Lright) return {x:x2, y:y1+s, ang:90};
                    s-=Lright;
                    if (s <= Lbottom) return {x:x2-s, y:y2, ang:180};
                    s-=Lbottom;
                    return {x:x1, y:y2-s, ang:270};
                }
                
                function render(){ for (const d of drops){ const p = pointAt(d.s); d.el.setAttribute('transform', `translate(${p.x},${p.y}) rotate(${p.ang})`); } }
                
                function step(ts){
                    if (!lastT) lastT = ts;
                    const dt = (ts-lastT)/1000; lastT = ts;
                    const v = parseInt(speed.value,10) || 0;
                    const glow = running ? (0.12 + 0.88*(v/100)) : 0.08;
                    lampGlow.setAttribute('opacity', glow.toFixed(3));
                    if (running){
                        const rotSpeed = v * 2.2;
                        wheelAngle = (wheelAngle + rotSpeed*dt) % 360;
                        wheelGrp.setAttribute('transform', `rotate(${wheelAngle})`);
                        const pxPerSec = v * 4.2;
                        for (const d of drops){ d.s += pxPerSec*dt; }
                        render();
                    }
                    window.currentAnimationId = requestAnimationFrame(step);
                }
                
                function updateValve(){
                    valveBar.setAttribute('opacity', running ? '0' : '1');
                    btn.setAttribute('aria-pressed', running);
                    btn.textContent = running ? '💧 Kraan open (stroming)' : '🔒 Kraan dicht (geen stroming)';
                }
                
                btn.addEventListener('click', () => { running = !running; updateValve(); });
                speed.addEventListener('input', () => { speedVal.textContent = speed.value; });
                
                render(); updateValve(); speedVal.textContent = speed.value;
                window.currentAnimationId = requestAnimationFrame(step);
            }
        },
        park: {
            html: `
              <h4>🎢 Pretpark-attractie</h4>
              <p><b>Spanning (U):</b> Het hoogteverschil van de achtbaan (energie per karretje).</p>
              <p><b>Stroom (I):</b> Aantal karretjes dat per seconde langsraast.</p>
              <p><b>Vermogen (P):</b> Hoeveelheid energie die alle karretjes samen per seconde leveren.</p>

              <div class="interactive-controls">
                   <button id="park-toggle" aria-pressed="false">🔓 Poort open (stilstaan)</button>
                   <label for="park-uSlider"><strong>Hoogte (U)</strong>:</label>
                   <input id="park-uSlider" type="range" min="0" max="100" value="60" />
                   <span id="park-uVal" class="interactive-hint">60</span>

                   <label for="park-iSlider"><strong>Doorstroming (I)</strong>:</label>
                   <input id="park-iSlider" type="range" min="1" max="10" value="4" />
                   <span id="park-iVal" class="interactive-hint">4 karretjes</span>
              </div>

              <div class="svg-wrap">
                  <svg id="park-scene" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540">
                       <defs>
                           <g id="park-car"><rect x="-14" y="-8" width="28" height="16" rx="4" fill="#0ea5e9" stroke="#075985" stroke-width="2"/><rect x="-10" y="-12" width="20" height="8" rx="2" fill="#38bdf8" stroke="#075985" stroke-width="1.5"/><circle cx="-8" cy="10" r="4" fill="#111"/><circle cx=" 8" cy="10" r="4" fill="#111"/></g>
                           <g id="park-genlamp"><circle id="park-glow" cx="0" cy="0" r="46" fill="#fff3a3" opacity="0.15"/><g id="park-genwheel"><circle cx="0" cy="0" r="28" fill="#e5e7eb" stroke="#475569" stroke-width="6"/><g fill="#93c5fd" stroke="#1e3a8a" stroke-width="2"><rect x="-6" y="-38" width="12" height="16" rx="3"/><rect x="-6" y="22" width="12" height="16" rx="3"/><rect x="-38" y="-6" width="16" height="12" rx="3"/><rect x="22" y="-6" width="16" height="12" rx="3"/><rect x="-26" y="-26" width="12" height="12" rx="3" transform="rotate(45)"/><rect x="-26" y="14" width="12" height="12" rx="3" transform="rotate(45)"/><rect x="14" y="-26" width="12" height="12" rx="3" transform="rotate(45)"/><rect x="14" y="14" width="12" height="12" rx="3" transform="rotate(45)"/></g><circle cx="0" cy="0" r="5" fill="#0ea5e9"/></g><text x="0" y="66" text-anchor="middle" class="park-small">Generator + lamp</text></g>
                       </defs>
                       <text x="480" y="36" text-anchor="middle" class="park-label" font-weight="700">Achtbaan — U = hoogte, I = karretjes / s</text>
                       <rect class="park-station" x="650" y="360" width="160" height="40" rx="8"/><text x="730" y="355" text-anchor="middle" class="park-small">Station/Remsectie</text>
                       <path id="park-track" class="park-track" d="M 220 360 C 220 230, 380 120, 480 120 C 580 120, 740 230, 740 360 C 740 420, 680 420, 650 400 C 630 388, 610 380, 580 380 C 500 380, 300 380, 220 360 Z"/>
                       <path class="park-track park-lift" d="M 260 340 C 260 240, 380 160, 480 160" />
                       <line id="park-gate" class="park-gate" x1="650" y1="380" x2="690" y2="380" opacity="0"/>
                       <g transform="translate(840,360)"><use href="#park-genlamp"/></g>
                       <path id="park-route" d="M 220 360 C 220 230, 380 120, 480 120 C 580 120, 740 230, 740 360 C 740 420, 680 420, 650 400 C 630 388, 610 380, 580 380 C 500 380, 300 380, 220 360 Z" fill="none" stroke="transparent" stroke-width="1"/>
                       <g id="park-fleet"></g>
                       <text x="190" y="430" class="park-label">Spanning (U) = hoogteverschil</text>
                       <text x="750" y="430" text-anchor="end" class="park-label">Stroom (I) = aantal karretjes per seconde</text>
                       <text x="480" y="470" text-anchor="middle" class="park-label">Vermogen P = U × I (lamp/velg sneller & helderder)</text>
                  </svg>
              </div>

              <p class="interactive-hint">Tip: speel met <b>U</b> en <b>I</b> afzonderlijk. Wat zie je aan de lamp en het wieltje als je <b>alleen U</b> verdubbelt? En als je <b>alleen I</b> verdubbelt?</p>
            `,
            init: function() {
                if (document.getElementById('park-scene').dataset.initialized) return;
                document.getElementById('park-scene').dataset.initialized = 'true';
                
                const btn = document.getElementById('park-toggle');
                const uSlider = document.getElementById('park-uSlider');
                const iSlider = document.getElementById('park-iSlider');
                const uVal = document.getElementById('park-uVal');
                const iVal = document.getElementById('park-iVal');

                const svg = document.getElementById('park-scene');
                const route = document.getElementById('park-route');
                const fleet = document.getElementById('park-fleet');
                const glow = svg.querySelector('#park-glow');
                const genwheel = svg.querySelector('#park-genwheel');
                const gate = document.getElementById('park-gate');

                let running = false;
                let lastT = null;
                const pathLen = route.getTotalLength();
                let cars = [];
                
                function setFleetSize(n){
                    n = Math.max(1, Math.min(10, n|0));
                    while (cars.length > n){ fleet.removeChild(cars.pop().el); }
                    while (cars.length < n){
                        const use = document.createElementNS('http://www.w3.org/2000/svg','use');
                        use.setAttributeNS('http://www.w3.org/1999/xlink','href','#park-car');
                        fleet.appendChild(use);
                        cars.push({ el: use, s: 0 });
                    }
                    for (let i=0;i<cars.length;i++){ cars[i].s = (i / n) * pathLen; }
                }
                
                function pointAt(s){
                    const p = route.getPointAtLength((s%pathLen+pathLen)%pathLen);
                    const p2 = route.getPointAtLength(((s+1)%pathLen+pathLen)%pathLen);
                    const ang = Math.atan2(p2.y - p.y, p2.x - p.x) * 180/Math.PI;
                    return { x: p.x, y: p.y, ang };
                }
                
                function renderCars(){ for (const c of cars){ const p = pointAt(c.s); c.el.setAttribute('transform', `translate(${p.x},${p.y}) rotate(${p.ang})`); } }
                
                function step(ts){
                    if (!lastT) lastT = ts;
                    const dt = (ts - lastT) / 1000;
                    lastT = ts;
                    const U = parseInt(uSlider.value,10) || 0;
                    const Icars = Math.max(1, parseInt(iSlider.value,10) || 1);
                    const v = 40 + U * 3.6;
                    if (running){
                        for (const c of cars){ c.s += v * dt; }
                        renderCars();
                    }
                    const I_norm = (Icars - 1) / 9;
                    const U_norm = U / 100;
                    const P_norm = U_norm * (0.1 + 0.9*I_norm);
                    const glowOpacity = 0.12 + 0.88 * P_norm;
                    glow.setAttribute('opacity', glowOpacity.toFixed(3));
                    const rotSpeed = 90 + 360 * P_norm;
                    const prev = genwheel._ang || 0;
                    genwheel._ang = (prev + rotSpeed * dt) % 360;
                    genwheel.setAttribute('transform', `rotate(${genwheel._ang})`);
                    window.currentAnimationId = requestAnimationFrame(step);
                }
                
                btn.addEventListener('click', () => {
                    running = !running;
                    if (running){
                        gate.setAttribute('opacity','0');
                        btn.setAttribute('aria-pressed','true');
                        btn.textContent = '🔒 Poort dicht (rit loopt)';
                    } else {
                        gate.setAttribute('opacity','1');
                        btn.setAttribute('aria-pressed','false');
                        btn.textContent = '🔓 Poort open (stilstaan)';
                    }
                });
                
                uSlider.addEventListener('input', () => { uVal.textContent = uSlider.value; });
                iSlider.addEventListener('input', () => {
                    iVal.textContent = iSlider.value + ' karretjes';
                    setFleetSize(parseInt(iSlider.value,10));
                    renderCars();
                });
                
                uVal.textContent = uSlider.value;
                iVal.textContent = iSlider.value + ' karretjes';
                setFleetSize(parseInt(iSlider.value,10));
                renderCars();
                window.currentAnimationId = requestAnimationFrame(step);
            }
        },
        direct: {
            html: `
              <h4>🧪 Directe Uitleg</h4>
              <p>Een echte stroomkring, waarin je zelf de <b>Spanning (U)</b> en de <b>Weerstand (R)</b> kunt aanpassen.</p>
              <p class="interactive-hint">De app berekent live de Stroomsterkte (I), het Vermogen (P) en de verbruikte Energie (E).</p>
              
              <div class="interactive-controls">
                   <button id="direct-toggle" aria-pressed="false">🔓 Schakelaar open</button>
                   <label for="direct-uSlider"><strong>Spanning U (V)</strong>:</label>
                   <input id="direct-uSlider" type="range" min="0" max="24" step="0.1" value="12" />
                   <span id="direct-uVal" class="interactive-hint">12.0 V</span>

                   <label for="direct-rSlider"><strong>Weerstand R (Ω)</strong>:</label>
                   <input id="direct-rSlider" type="range" min="1" max="300" step="1" value="24" />
                   <span id="direct-rVal" class="interactive-hint">24 Ω</span>
                   
                   <button id="direct-resetE">↺ Reset energie</button>
              </div>
              
              <div class="interactive-controls" id="direct-readouts" aria-live="polite">
                  <div class="interactive-hint"><strong>I</strong> = <span id="direct-Iamp">0.500</span> A</div>
                  <div class="interactive-hint"><strong>P</strong> = <span id="direct-Pwatt">6.00</span> W</div>
                  <div class="interactive-hint"><strong>E</strong> = <span id="direct-Ejoule">0</span> J</div>
              </div>

              <div class="svg-wrap">
                  <svg id="direct-scene" viewBox="0 0 960 540">
                       <defs>
                          <g id="direct-charge"><circle cx="0" cy="0" r="4" fill="#2563eb" /></g>
                          <g id="direct-battery"><rect x="-50" y="-36" width="100" height="72" rx="8" fill="#e2e8f0" stroke="#64748b" stroke-width="6"/><line x1="-20" y1="0" x2="0" y2="0" stroke="#1f2937" stroke-width="6"/><line x1="10" y1="-14" x2="10" y2="14" stroke="#b91c1c" stroke-width="6"/><line x1="20" y1="0" x2="48" y2="0" stroke="#b91c1c" stroke-width="6"/><text x="-32" y="10" text-anchor="end" class="direct-small">−</text><text x="48" y="10" class="direct-small">+</text><text x="0" y="-52" text-anchor="middle" class="direct-label">Batterij</text></g>
                          <g id="direct-switch"><line x1="-60" y1="0" x2="60" y2="0" class="direct-wire"/><line id="direct-bridge" x1="-10" y1="0" x2="10" y2="0" class="direct-gate" opacity="0"/><circle cx="0" cy="0" r="6" fill="#ef4444"/><text x="0" y="-38" text-anchor="middle" class="direct-label">Schakelaar</text><text x="0" y="28" text-anchor="middle" class="direct-small">Open = geen stroom</text></g>
                          <g id="direct-resistor"><rect x="-50" y="-24" width="100" height="48" rx="8" class="direct-resBody"/><path id="direct-zig" d="M -36 0 L -24 -12 L -12 12 L 0 -12 L 12 12 L 24 -12 L 36 0" fill="none" stroke="#374151" stroke-width="4" /><circle id="direct-glow" cx="0" cy="0" r="58" fill="#fff3a3" opacity="0.12"/><text x="0" y="-38" text-anchor="middle" class="direct-label">Weerstand / lamp</text><text x="0" y="44" text-anchor="middle" class="direct-small">P = U × I</text></g>
                      </defs>
                      <text x="480" y="36" text-anchor="middle" class="direct-label" font-weight="700">DC-kring — U, I, P, E live</text>
                      <path d="M 160 140 H 360" class="direct-wire"/><use href="#direct-switch" x="390" y="140"/><path d="M 420 140 H 800" class="direct-wire"/><path d="M 800 140 V 380" class="direct-wire"/><path d="M 800 380 H 160" class="direct-wire"/><path d="M 160 380 V 140" class="direct-wire"/>
                      <use href="#direct-battery" x="160" y="260"/><g transform="translate(800,260)"><use href="#direct-resistor"/></g>
                      <path id="direct-route" d="M 170 140 H 790 V 380 H 170 Z" fill="none" stroke="transparent" stroke-width="1"/>
                      <g id="direct-charges"></g>
                      <text x="140" y="470" text-anchor="middle" class="direct-small">I = U / R</text>
                      <text x="480" y="470" text-anchor="middle" class="direct-small">P = U × I</text>
                      <text x="820" y="470" text-anchor="middle" class="direct-small">E = P × t</text>
                  </svg>
              </div>
              `,
            init: function() {
                if (document.getElementById('direct-scene').dataset.initialized) return;
                document.getElementById('direct-scene').dataset.initialized = 'true';

                const btn = document.getElementById('direct-toggle'), uSl = document.getElementById('direct-uSlider'), rSl = document.getElementById('direct-rSlider'),
                uVal = document.getElementById('direct-uVal'), rVal = document.getElementById('direct-rVal'), resetE = document.getElementById('direct-resetE');
                const chargesG = document.getElementById('direct-charges'), bridge = document.getElementById('direct-bridge'), glow = document.getElementById('direct-glow');
                const Iamp = document.getElementById('direct-Iamp'), Pwatt = document.getElementById('direct-Pwatt'), Ejoule = document.getElementById('direct-Ejoule');
                
                let running = false, lastT = null, E_J = 0;
                
                const x1=170, y1=140, x2=790, y2=380;
                const Ltop = x2-x1, Lright=y2-y1, Lbottom=x2-x1;
                const L = (Ltop + Lright) * 2;
                
                const N = 26, dots = [];
                for (let i=0;i<N;i++){
                    const use = document.createElementNS('http://www.w3.org/2000/svg','use');
                    use.setAttributeNS('http://www.w3.org/1999/xlink','href','#direct-charge');
                    chargesG.appendChild(use);
                    dots.push({ el: use, s: (i/N)*L });
                }
                
                function pointAt(sTot){
                    let s = ((sTot%L)+L)%L;
                    if (s <= Ltop) return {x:x1+s, y:y1};
                    s-=Ltop;
                    if (s <= Lright) return {x:x2, y:y1+s};
                    s-=Lright;
                    if (s <= Lbottom) return {x:x2-s, y:y2};
                    s-=Lbottom;
                    return {x:x1, y:y2-s};
                }
                
                function renderDots(){ for (const d of dots){ const p = pointAt(d.s); d.el.setAttribute('transform', `translate(${p.x},${p.y})`); } }
                function fmt(n, digits){ return Number(n).toFixed(digits); }
                
                function compute() {
                    const U = parseFloat(uSl.value) || 0;
                    const R = Math.max(1, parseFloat(rSl.value) || 1);
                    const I = running ? (U / R) : 0;
                    const P = U * I;
                    return {U,R,I,P};
                }
                
                function updateReadouts({U,R,I,P}){
                    Iamp.textContent = fmt(I, 3);
                    Pwatt.textContent = fmt(P, 2);
                    Ejoule.textContent = Math.round(E_J).toString();
                    uVal.textContent = fmt(U,1)+' V';
                    rVal.textContent = Math.round(R)+' Ω';
                    const Pnorm = Math.min(1, P / 60);
                    const opacity = 0.12 + 0.88 * Pnorm;
                    glow.setAttribute('opacity', opacity.toFixed(3));
                }
                
                function step(ts){
                    if (!lastT) lastT = ts;
                    const dt = (ts - lastT) / 1000;
                    lastT = ts;
                    const {U,R,I,P} = compute();
                    if (running){
                        const v = I * 500;
                        for (const d of dots){ d.s += v * dt; }
                        renderDots();
                        E_J += P * dt;
                    }
                    updateReadouts({U,R,I,P});
                    window.currentAnimationId = requestAnimationFrame(step);
                }
                
                btn.addEventListener('click', () => {
                    running = !running;
                    bridge.setAttribute('opacity', running ? '1' : '0');
                    btn.setAttribute('aria-pressed', running);
                    btn.textContent = running ? '🔒 Schakelaar dicht' : '🔓 Schakelaar open';
                });
                
                uSl.addEventListener('input', () => updateReadouts(compute()));
                rSl.addEventListener('input', () => updateReadouts(compute()));
                resetE.addEventListener('click', () => { E_J = 0; updateReadouts(compute()); });
                
                renderDots(); updateReadouts(compute()); 
                window.currentAnimationId = requestAnimationFrame(step);
            }
        }
    };
    
    explanationContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('answer-btn')) {
            const optionsContainer = e.target.closest('.answer-options');
            const feedbackEl = optionsContainer.nextElementSibling;
            
            // Disable all buttons in this group
            optionsContainer.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);

            if (e.target.dataset.correct === 'true') {
                e.target.classList.add('correct');
                feedbackEl.textContent = '✅ Correct! Goed gedaan.';
                feedbackEl.className = 'correct';
            } else {
                e.target.classList.add('incorrect');
                const correctButton = optionsContainer.querySelector('[data-correct="true"]');
                correctButton.classList.add('correct');
                feedbackEl.textContent = '❌ Helaas, het juiste antwoord is gemarkeerd.';
                feedbackEl.className = 'incorrect';
            }
        }
    });

    metaphorCards.forEach(card => {
        card.addEventListener('click', () => {
            metaphorCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const metaphor = card.dataset.metaphor;
            const content = explanations[metaphor];

            if (window.currentAnimationId) {
                cancelAnimationFrame(window.currentAnimationId);
                window.currentAnimationId = null;
            }

            explanationContainer.innerHTML = content.html;
            if(content.init) content.init();
        });
    });

    // --- Calculation Exercises Logic ---
    let vermogenOpgave = {}, energieOpgave = {};
    function genereerVermogenVraag() {
        const spanning = Math.floor(Math.random() * 51) + 200; // 200-250 V
        const stroom = (Math.random() * 4.5 + 0.5).toFixed(1); // 0.5-5.0 A
        vermogenOpgave = {
            vraag: `Een airfryer is aangesloten op <b>${spanning} V</b> en gebruikt <b>${stroom} A</b>. Bereken het vermogen in Watt.`,
            antwoord: (spanning * stroom).toFixed(0)
        };
        document.getElementById('vermogen-vraag').innerHTML = vermogenOpgave.vraag;
        const feedbackEl = document.getElementById('vermogen-feedback');
        document.getElementById('vermogen-antwoord').value = '';
        feedbackEl.className = '';
        feedbackEl.textContent = '';
    }
    function genereerEnergieVraag() {
        const vermogen = (Math.floor(Math.random() * 16) + 5) * 100; // 500-2000 W
        const tijdMinuten = Math.floor(Math.random() * 9) + 2; // 2-10 minuten
        energieOpgave = {
            vraag: `Een föhn van <b>${vermogen} W</b> staat <b>${tijdMinuten} min</b> aan. Bereken de verbruikte energie in Joule. (Hint: Tijd in seconden!)`,
            antwoord: (vermogen * tijdMinuten * 60).toString()
        };
        document.getElementById('energie-vraag').innerHTML = energieOpgave.vraag;
        const feedbackEl = document.getElementById('energie-feedback');
        document.getElementById('energie-antwoord').value = '';
        feedbackEl.className = '';
        feedbackEl.textContent = '';
    }
    function checkAntwoord(userInput, correctAntwoord, feedbackElement) {
        const sanitizedInput = userInput.replace(',', '.').trim();
        if (sanitizedInput === '') {
            feedbackElement.textContent = 'Vul een antwoord in.';
            feedbackElement.className = 'incorrect'; return;
        }
        const isCorrect = Math.abs(parseFloat(sanitizedInput) - parseFloat(correctAntwoord)) <= 1; // Tolerance of 1 Watt/Joule
        if (isCorrect) {
            feedbackElement.textContent = '✅ Correct! Goed gedaan!';
            feedbackElement.className = 'correct'; return true;
        } else {
            feedbackElement.textContent = '❌ Helaas, dat is niet juist. Probeer het nog eens.';
            feedbackElement.className = 'incorrect'; return false;
        }
    }
    document.getElementById('check-vermogen').addEventListener('click', () => {
        if (checkAntwoord(document.getElementById('vermogen-antwoord').value, vermogenOpgave.antwoord, document.getElementById('vermogen-feedback'))) {
            setTimeout(genereerVermogenVraag, 2000);
        }
    });
    document.getElementById('check-energie').addEventListener('click', () => {
        if (checkAntwoord(document.getElementById('energie-antwoord').value, energieOpgave.antwoord, document.getElementById('energie-feedback'))) {
            setTimeout(genereerEnergieVraag, 2000);
        }
    });

    // --- Progress Tracking Logic ---
    document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const accordionId = checkbox.id.replace('check-', 'accordion-').replace('-rekenen', '');
            const progressId = checkbox.id.replace('check-', 'progress-').replace('-rekenen', '');
            document.getElementById(accordionId).classList.toggle('completed', e.target.checked);
            document.getElementById(progressId).classList.toggle('completed', e.target.checked);
        });
    });

    // --- Initialize App ---
    genereerVermogenVraag();
    genereerEnergieVraag();
});
