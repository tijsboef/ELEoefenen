// --- All Interactive Logic (JavaScript) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Global Animation Controller ---
    window.currentAnimationId = null;

    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const navLinks = document.querySelectorAll('.sidebar-nav__item');
    const sections = document.querySelectorAll('.content-block');

    // --- Session State for Answers ---
    let sessionAnswers = JSON.parse(sessionStorage.getItem('quizAnswers')) || {};

    // --- Sidebar Toggle for Mobile ---
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('is-open');
        });
    }

    // --- Sidebar Link Click Logic ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (window.innerWidth <= 900) {
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
                document.querySelectorAll('.sidebar-nav__item').forEach(link => {
                    link.classList.toggle('sidebar-nav__item--active', link.getAttribute('href') === `#${id}`);
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
              
              <div class="interactive-controls">
                   <button id="mnm-toggle" aria-pressed="false">🔓 Brug open (geen stroom)</button>
                   <label for="mnm-speed">Snelheid (I):</label>
                   <input id="mnm-speed" type="range" min="0" max="100" value="45" />
                   <span id="mnm-speedVal" class="interactive-hint">45</span>
              </div>
              
              <div class="svg-wrap">
                  <svg id="mnm-scene" viewBox="0 0 960 540">
                       <defs>
                          <g id="mnm-truck"><rect x="-30" y="-12" width="60" height="24" rx="4" ry="4" fill="#4ee68a" stroke="#1a7a43" stroke-width="2"/><rect x="18" y="-16" width="28" height="32" rx="4" ry="4" fill="#7ff0b2" stroke="#1a7a43" stroke-width="2"/><rect x="24" y="-10" width="12" height="10" rx="2" fill="#dff" stroke="#8ac" stroke-width="1"/><circle cx="-15" cy="14" r="8" fill="#222"/><circle cx="15" cy="14" r="8" fill="#222"/><circle cx="-15" cy="14" r="4" fill="#888"/><circle cx="15" cy="14" r="4" fill="#888"/><circle cx="-14" cy="-4" r="4" fill="#e33"/><circle cx="-4" cy="-6" r="4" fill="#f4b400"/><circle cx="6" cy="-4" r="4" fill="#4285f4"/></g>
                          <g id="mnm-shop"><rect x="-50" y="-40" width="100" height="80" rx="8" fill="#ffd54f" stroke="#cc9a00" stroke-width="4"/><rect x="-36" y="-30" width="32" height="40" fill="#fff" stroke="#cc9a00" stroke-width="3"/><rect x="6" y="-30" width="32" height="40" fill="#fff" stroke="#cc9a00" stroke-width="3"/><text x="0" y="60" text-anchor="middle" class="mnm-label">Winkel (Verbruiker)</text></g>
                          <g id="mnm-factory"><path d="M-80 -40 L 0 -80 L 80 -40 Z" fill="#9ca3af" stroke="#6b7280" stroke-width="4"/><rect x="-70" y="-40" width="140" height="100" rx="8" fill="#d1d5db" stroke="#6b7280" stroke-width="4"/><rect x="20" y="-70" width="15" height="40" fill="#9ca3af" stroke="#6b7280" stroke-width="3"/><rect x="45" y="-65" width="15" height="35" fill="#9ca3af" stroke="#6b7280" stroke-width="3"/><text x="0" y="85" text-anchor="middle" class="mnm-label">Fabriek (Bron)</text></g>
                      </defs>
                      <path d="M 160 140 H 360" class="mnm-road"/><path d="M 420 140 H 800" class="mnm-road"/><path d="M 800 140 V 380" class="mnm-road"/><path d="M 800 380 H 160" class="mnm-road"/><path d="M 160 380 V 140" class="mnm-road"/>
                      <line id="mnm-bridge" x1="360" y1="140" x2="420" y2="140" stroke="#dc2626" stroke-width="10" stroke-linecap="round" opacity="1"/>
                      <use href="#mnm-factory" x="160" y="260"/>
                      <use href="#mnm-shop" x="480" y="380"/>
                      <g transform="translate(800, 260)">
                        <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#e5e7eb" stroke="#9ca3af" stroke-width="3"/>
                        <text x="0" y="-5" text-anchor="middle" class="mnm-small">Vrachtwagens/sec (I)</text>
                        <text id="mnm-current-value" x="0" y="20" text-anchor="middle" class="mnm-label" font-weight="bold">45</text>
                      </g>
                      <g transform="translate(480, 470)">
                        <rect x="-70" y="-25" width="140" height="50" rx="8" fill="#e5e7eb" stroke="#9ca3af" stroke-width="3"/>
                        <text x="0" y="0" text-anchor="middle" class="mnm-small">Energie per lading (U)</text>
                        <text x="0" y="20" text-anchor="middle" class="mnm-label" font-weight="bold">Constant</text>
                      </g>
                      <g id="mnm-fleet"></g>
                  </svg>
              </div>
              <div class="control-question" data-question-id="mnm-q1">
                  <p>1. Wat stelt de lading M&M's in één vrachtwagen voor?</p>
                  <div class="answer-options">
                      <button class="answer-btn" data-correct="true">De hoeveelheid energie per lading (Spanning)</button>
                      <button class="answer-btn">Het aantal vrachtwagens (Stroom)</button>
                      <button class="answer-btn">De snelheid van de vrachtwagens</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
              <div class="control-question hidden" data-question-id="mnm-q2">
                  <p>2. Als er méér vrachtwagens per seconde over de weg rijden, welke grootheid neemt dan toe?</p>
                  <div class="answer-options">
                      <button class="answer-btn">De Spanning (U)</button>
                      <button class="answer-btn" data-correct="true">De Stroomsterkte (I)</button>
                      <button class="answer-btn">De Weerstand (R)</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
               <div class="control-question hidden" data-question-id="mnm-q3">
                  <p>3. Een vrachtwagen heeft een lek en verliest de helft van zijn M&M's. Wat is er met die specifieke lading gebeurd?</p>
                  <div class="answer-options">
                      <button class="answer-btn">De stroomsterkte is gehalveerd.</button>
                      <button class="answer-btn">De hele kring stopt.</button>
                      <button class="answer-btn" data-correct="true">De spanning van die lading is gehalveerd.</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
              `,
            init: function() {
                if (document.getElementById('mnm-scene').dataset.initialized) return;
                document.getElementById('mnm-scene').dataset.initialized = 'true';

                const btn = document.getElementById('mnm-toggle'), speed = document.getElementById('mnm-speed'), speedVal = document.getElementById('mnm-speedVal'),
                bridge= document.getElementById('mnm-bridge'), fleet = document.getElementById('mnm-fleet'),
                currentDisplay = document.getElementById('mnm-current-value');
                
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
                    btn.textContent = running ? '🔒 Brug dicht (stroom loopt)' : '🔓 Brug open (geen stroom)';
                }
                
                btn.addEventListener('click', () => { running = !running; updateBridge(); });
                speed.addEventListener('input', () => { 
                    speedVal.textContent = speed.value;
                    if(currentDisplay) currentDisplay.textContent = speed.value;
                });
                
                renderTrucks(); updateBridge(); 
                speedVal.textContent = speed.value;
                if(currentDisplay) currentDisplay.textContent = speed.value;
                window.currentAnimationId = requestAnimationFrame(step);
            }
        },
        water: {
            html: `
              <h4>💧 Waterleiding</h4>
              <p><b>Spanning (U):</b> De waterdruk.</p>
              <p><b>Stroom (I):</b> Aantal liters water dat per seconde stroomt.</p>

              <div class="control-question" data-question-id="water-q1">
                  <p>1. De waterdruk in de leiding wordt verhoogd. Welke grootheid is hiermee te vergelijken?</p>
                  <div class="answer-options">
                      <button class="answer-btn" data-correct="true">Spanning (U)</button>
                      <button class="answer-btn">Stroomsterkte (I)</button>
                      <button class="answer-btn">Weerstand (R)</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
              <div class="control-question hidden" data-question-id="water-q2">
                  <p>2. Je draait de kraan verder open, waardoor er meer water per seconde door de buis stroomt. Wat neemt hierdoor toe?</p>
                  <div class="answer-options">
                      <button class="answer-btn">De Spanning (U)</button>
                      <button class="answer-btn" data-correct="true">De Stroomsterkte (I)</button>
                      <button class="answer-btn">Het Waterpeil</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
              <div class="control-question hidden" data-question-id="water-q3">
                  <p>3. Een tuinslang wordt een beetje dichtgeknepen. Het water spuit er nu harder uit. Wat is er veranderd op het punt van de vernauwing?</p>
                  <div class="answer-options">
                      <button class="answer-btn">De spanning is daar hoger.</button>
                      <button class="answer-btn" data-correct="true">De weerstand is daar hoger en de stroom kleiner.</button>
                      <button class="answer-btn">De stroomsterkte is daar hoger.</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
              `,
            init: null
        },
        park: {
            html: `
              <h4>🎢 Pretpark-attractie</h4>
              <p><b>Spanning (U):</b> Het hoogteverschil van de achtbaan (energie per karretje).</p>
              <p><b>Stroom (I):</b> Aantal karretjes dat per seconde langsraast.</p>

              <div class="control-question" data-question-id="park-q1">
                  <p>1. De liftheuvel van de achtbaan wordt hoger gemaakt. Welke elektrische grootheid verandert hierdoor?</p>
                  <div class="answer-options">
                      <button class="answer-btn">De Stroomsterkte (I)</button>
                      <button class="answer-btn" data-correct="true">De Spanning (U)</button>
                      <button class="answer-btn">De Weerstand (R)</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
              <div class="control-question hidden" data-question-id="park-q2">
                  <p>2. Er worden extra karretjes op de baan gezet die allemaal achter elkaar rijden. Wat neemt hierdoor toe?</p>
                  <div class="answer-options">
                      <button class="answer-btn">De Spanning (U)</button>
                      <button class="answer-btn" data-correct="true">De Stroomsterkte (I)</button>
                      <button class="answer-btn">De snelheid per karretje</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
              <div class="control-question hidden" data-question-id="park-q3">
                  <p>3. De karretjes worden zwaarder gemaakt, maar de hoogte van de heuvel blijft gelijk. Wat gebeurt er met de energie per karretje?</p>
                  <div class="answer-options">
                      <button class="answer-btn">De energie per karretje (U) neemt af.</button>
                      <button class="answer-btn" data-correct="true">De energie per karretje (U) neemt toe.</button>
                      <button class="answer-btn">De stroomsterkte (I) neemt toe.</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
            `,
            init: null
        },
        direct: {
            html: `
              <h4>🧪 Directe Uitleg</h4>
              <p><b>Spanning (U):</b> De hoeveelheid elektrische energie die elke lading meekrijgt. Gemeten in Volt (V).</p>
              <p><b>Stroom (I):</b> De hoeveelheid lading die per seconde door een draad beweegt. Gemeten in Ampère (A).</p>
              
              <div class="control-question" data-question-id="direct-q1">
                  <p>1. Welke grootheid geeft de 'duwkracht' of energie aan die de batterij meegeeft aan elke elektron?</p>
                  <div class="answer-options">
                      <button class="answer-btn" data-correct="true">De Spanning (U)</button>
                      <button class="answer-btn">De Stroomsterkte (I)</button>
                      <button class="answer-btn">Het Vermogen (P)</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
              <div class="control-question hidden" data-question-id="direct-q2">
                  <p>2. Als er 5 Coulomb aan lading in één seconde door een lamp stroomt, wat beschrijft dit dan?</p>
                  <div class="answer-options">
                      <button class="answer-btn">Een spanning van 5 Volt.</button>
                      <button class="answer-btn">Een weerstand van 5 Ohm.</button>
                      <button class="answer-btn" data-correct="true">Een stroomsterkte van 5 Ampère.</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
              <div class="control-question hidden" data-question-id="direct-q3">
                  <p>3. Twee batterijen (A: 1.5V, B: 9V) worden gebruikt. Welke batterij geeft de meeste energie per elektron mee?</p>
                  <div class="answer-options">
                      <button class="answer-btn">Batterij A (1.5V)</button>
                      <button class="answer-btn" data-correct="true">Batterij B (9V)</button>
                      <button class="answer-btn">Ze geven evenveel energie mee.</button>
                  </div>
                  <div class="answer-feedback"></div>
              </div>
              `,
            init: null
        }
    };
    
    // --- Function to Restore Answer State from Session Storage ---
    function restoreAnswerState(container) {
        const questionBlocks = container.querySelectorAll('.control-question');
        if (!questionBlocks) return;

        questionBlocks.forEach((questionBlock, index) => {
            const questionId = questionBlock.dataset.questionId;
            const savedAnswer = sessionAnswers[questionId];

            if (savedAnswer !== undefined) {
                // If this question is answered, reveal it
                questionBlock.classList.remove('hidden');
                
                const answerButtons = questionBlock.querySelectorAll('.answer-btn');
                const feedbackEl = questionBlock.querySelector('.answer-feedback');
                
                answerButtons.forEach((btn, btnIndex) => {
                    btn.disabled = true;
                    if (btnIndex === savedAnswer) {
                        btn.classList.add(btn.dataset.correct === 'true' ? 'correct' : 'incorrect');
                    }
                    if (btn.dataset.correct === 'true') {
                        btn.classList.add('correct'); // Always show the correct one
                    }
                });

                feedbackEl.textContent = 'Dit antwoord heb je al gegeven.';
                feedbackEl.className = 'answer-feedback correct';

                // If the answer was correct, also reveal the next question
                if (answerButtons[savedAnswer]?.dataset.correct === 'true' && questionBlocks[index + 1]) {
                    questionBlocks[index + 1].classList.remove('hidden');
                }
            }
        });
    }

    explanationContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('answer-btn') && !e.target.disabled) {
            const questionBlock = e.target.closest('.control-question');
            const questionId = questionBlock.dataset.questionId;
            const optionsContainer = e.target.closest('.answer-options');
            const feedbackEl = optionsContainer.nextElementSibling;
            const answerButtons = optionsContainer.querySelectorAll('.answer-btn');
            let answeredIndex;

            answerButtons.forEach((btn, index) => {
                btn.disabled = true;
                if (btn === e.target) {
                    answeredIndex = index;
                }
            });
            
            sessionAnswers[questionId] = answeredIndex;
            sessionStorage.setItem('quizAnswers', JSON.stringify(sessionAnswers));

            const isCorrect = e.target.dataset.correct === 'true';

            if (isCorrect) {
                e.target.classList.add('correct');
                feedbackEl.textContent = '✅ Correct! Goed gedaan.';
                feedbackEl.className = 'answer-feedback correct';
                // Reveal next question
                const nextQuestion = questionBlock.nextElementSibling;
                if (nextQuestion && nextQuestion.classList.contains('control-question')) {
                    nextQuestion.classList.remove('hidden');
                }
            } else {
                e.target.classList.add('incorrect');
                const correctButton = optionsContainer.querySelector('[data-correct="true"]');
                if (correctButton) {
                    correctButton.classList.add('correct');
                }
                feedbackEl.textContent = '❌ Helaas, het juiste antwoord is groen gemarkeerd.';
                feedbackEl.className = 'answer-feedback incorrect';
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
            
            restoreAnswerState(explanationContainer);
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
    
    // --- Initialize App ---
    genereerVermogenVraag();
    genereerEnergieVraag();
});
