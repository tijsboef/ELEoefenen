document.addEventListener('DOMContentLoaded', () => {

    // --- Accordion Functionaliteit ---
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(accordion => {
        const toggle = accordion.querySelector('.accordion-toggle');
        toggle.addEventListener('click', () => {
            // Sluit andere accordions
            accordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion) {
                    otherAccordion.classList.remove('expanded');
                }
            });
            // Toggle de huidige
            accordion.classList.toggle('expanded');
        });
    });

    // --- Metafoor Uitleg ---
    const metaphorCards = document.querySelectorAll('.card-hover');
    const explanationContainer = document.getElementById('explanation-content');
    const explanations = {
        mnm: `<h4>🍫 M&M-fabriek</h4><p><b>Spanning (U):</b> Aantal M&M’s per vrachtwagen (energie per lading).</p><p><b>Stroom (I):</b> Aantal vrachtwagens per seconde.</p><p><b>Vermogen (P):</b> Totaal aantal M&M’s dat per seconde aankomt.</p><p><b>Energie (E):</b> Totaal aantal geleverde M&M’s in een bepaalde tijd.</p>`,
        water: `<h4>💧 Waterleiding</h4><p><b>Spanning (U):</b> De waterdruk.</p><p><b>Stroom (I):</b> Aantal liters water dat per seconde stroomt.</p><p><b>Vermogen (P):</b> De totale waterkracht per seconde.</p><p><b>Energie (E):</b> De totale hoeveelheid water die is doorgestroomd in een bepaalde tijd.</p>`,
        park: `<h4>🎢 Pretpark-attractie</h4><p><b>Spanning (U):</b> Het hoogteverschil van de achtbaan.</p><p><b>Stroom (I):</b> Aantal karretjes dat per seconde langsraast.</p><p><b>Vermogen (P):</b> Hoeveelheid energie die alle karretjes samen per seconde leveren.</p><p><b>Energie (E):</b> De totale energie die in een bepaalde tijd is verbruikt.</p>`,
        direct: `<h4>🧪 Directe Uitleg</h4><p><b>Spanning (U):</b> De hoeveelheid elektrische energie die elke lading meekrijgt. Gemeten in Volt (V).</p><p><b>Stroom (I):</b> De hoeveelheid lading die per seconde door een draad beweegt. Gemeten in Ampère (A).</p><p><b>Vermogen (P):</b> De hoeveelheid energie die per seconde wordt omgezet. Gemeten in Watt (W).</p><p><b>Energie (E):</b> De totale hoeveelheid omgezette energie. Gemeten in Joule (J) of kilowattuur (kWh).</p>`
    };

    metaphorCards.forEach(card => {
        card.addEventListener('click', () => {
            metaphorCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const metaphor = card.dataset.metaphor;
            explanationContainer.innerHTML = explanations[metaphor];
        });
    });

    // --- Rekenopgaven ---
    let vermogenOpgave = {};
    let energieOpgave = {};

    function genereerVermogenVraag() {
        const spanning = Math.floor(Math.random() * 50) + 200; // Spanning tussen 200V en 250V
        const stroom = (Math.random() * 4 + 1).toFixed(1); // Stroom tussen 1.0A en 5.0A
        const antwoord = spanning * stroom;

        vermogenOpgave = {
            vraag: `Een waterkoker is aangesloten op <b>${spanning} V</b>. Er loopt een stroom van <b>${stroom} A</b>. Bereken het vermogen.`,
            antwoord: antwoord.toFixed(0)
        };

        document.getElementById('vermogen-vraag').innerHTML = vermogenOpgave.vraag;
        document.getElementById('vermogen-antwoord').value = '';
        document.getElementById('vermogen-feedback').textContent = '';
    }

    function genereerEnergieVraag() {
        const vermogen = (Math.floor(Math.random() * 10) + 5) * 100; // Vermogen in stappen van 100W (500-1500W)
        const tijdMinuten = Math.floor(Math.random() * 5) + 1; // Tijd tussen 1 en 5 minuten
        const tijdSeconden = tijdMinuten * 60;
        const antwoord = vermogen * tijdSeconden;

        energieOpgave = {
            vraag: `Een stofzuiger met een vermogen van <b>${vermogen} W</b> staat <b>${tijdMinuten} minuten</b> aan. Bereken de verbruikte energie. (Let op: reken de tijd om naar seconden!)`,
            antwoord: antwoord.toString()
        };

        document.getElementById('energie-vraag').innerHTML = energieOpgave.vraag;
        document.getElementById('energie-antwoord').value = '';
        document.getElementById('energie-feedback').textContent = '';
    }
    
    // Antwoord validatie functie
    function checkAntwoord(inputId, feedbackId, correctAntwoord) {
        const userAnswer = document.getElementById(inputId).value.replace(',', '.');
        const feedbackEl = document.getElementById(feedbackId);

        if (Math.abs(parseFloat(userAnswer) - parseFloat(correctAntwoord)) < 1) { // Tolereert kleine afrondingsverschillen
            feedbackEl.textContent = '✅ Correct!';
            feedbackEl.className = 'correct';
            return true;
        } else {
            feedbackEl.textContent = '❌ Helaas, probeer het nog eens.';
            feedbackEl.className = 'incorrect';
            return false;
        }
    }

    // Event listeners voor de controle knoppen
    document.getElementById('check-vermogen').addEventListener('click', () => {
        if(checkAntwoord('vermogen-antwoord', 'vermogen-feedback', vermogenOpgave.antwoord)) {
           setTimeout(genereerVermogenVraag, 2000); // Genereer nieuwe vraag na 2 sec
        }
    });

    document.getElementById('check-energie').addEventListener('click', () => {
         if(checkAntwoord('energie-antwoord', 'energie-feedback', energieOpgave.antwoord)) {
            setTimeout(genereerEnergieVraag, 2000);
        }
    });
    
    // --- Progressie bijhouden ---
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const accordionId = checkbox.id.replace('check-', 'accordion-').replace('-rekenen', '');
            const progressId = checkbox.id.replace('check-', 'progress-').replace('-rekenen', '');
            
            document.getElementById(accordionId).classList.toggle('completed', checkbox.checked);
            document.getElementById(progressId).classList.toggle('completed', checkbox.checked);
        });
    });

    // Initialiseer de eerste vragen
    genereerVermogenVraag();
    genereerEnergieVraag();
    
    // Open de eerste accordion standaard
    document.getElementById('accordion-uitleg').classList.add('expanded');
});
