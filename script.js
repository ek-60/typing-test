// const RANDOM_QUATE_API_URL = 'https://api.quotable.io/random'
// const quoteDisplayElement = document.getElementById('quoteDisplay')
// const quoteInputElement = document.getElementById('quoteInput')
// const timerElement = document.getElementById('timer')

// quoteInputElement.addEventListener('input', () => {
//     // console.log('changed')
//     const arrayQuote = quoteDisplayElement.querySelectorAll('span')
//     const arrayValue = quoteInputElement.value.split('')

//     let correct = true
//     arrayQuote.forEach((characterSpan, index) => {
//         const character = arrayValue[index]
//         if (character == null) {
//             characterSpan.classList.remove('correct')
//             character.classList.remove('incorrect')
//             correct = false
//         }
//         else if (character === characterSpan.innerText) {
//             characterSpan.classList.add('correct')
//             characterSpan.classList.remove('incorrect')
//             correct = false
//         }
//         else {
//             characterSpan.classList.remove('correct')
//             characterSpan.classList.add('incorrect')
//             correct = false
//         }
//         if (correct) renderNewQuote()
//     })
// })

// function getRandomQuote() {
//     return fetch(RANDOM_QUATE_API_URL)
//     .then(response => response.json())
//     .then(data => data.content)
// }

// async function renderNewQuote() {
//     const quote = await getRandomQuote()
//     console.log(quote)
//     quoteDisplayElement.innerHTML = ''
//     quote.split('').forEach(character => {
//         const characterSpan = document.createElement('span')
//         // characterSpan.classList.add('correct')
//         characterSpan.innerText = character
//         quoteDisplayElement.appendChild(characterSpan)
//     });
//     quoteInputElement.value = null
//     startTimer()
// }

// let startTime
// function startTimer() {
//     timerElement.innerText = 0
//     startTime = new Date()
//     setInterval(() => {
//         timer.innerText = getTimerTime()
//     }, 1000)
// }

// function getTimerTime() {
//     return Math.floor((new Date() - startTime) / 1000)
// }

// renderNewQuote()


// AIKA MAKSIMI
let TIME_LIMIT = 30;

// LAUSEET MITÄ KYSYTÄÄN PELISSÄ KIROITTAMAAN MAHD NOPEASTI
// LINKKI YLEN UUTISEEN https://yle.fi/urheilu/3-12357217
let quotes_array = [
  'Patrik Laine aloitti yön NHL-kierroksella maalinteon, kun Columbus Blue Jackets voitti Vegas Golden Knightsin 6-4.',
  'Edellisottelussa polveensa saamasta kolhusta huolimatta pelaamaan pystynyt Laine ampui kiekon häkkiin ylivoimalla Gustav Nyquistin tarjoilusta, kun vain pari minuuttia avauserää oli takana.',
  'Laine on iskenyt 41 ottelussa tehopisteet 23+20=43.',
  'Laineen osuma jutun pääkuvan paikalla. ' ,
  'Columbus-tulokas, tämän hetken nuorin NHL-pelaaja Cole Sillinger, 18, iski uransa ensimmäisen hattutempun.',
  'Sillinger on tehnyt 57 ottelussa yhteensä 21 tehopistettä. ',
  'Kolme edellistä alle 19-vuotiaan hattutempua olivat kaikki Patrik Laineen nimissä.',
  'Laine teki kaudella 2016-2017 kolme hattutempua, joista viimeisimmän 18 vuoden ja 301 päivän ikäisenä - saman ikäisenä kuin Sillinger nyt.',
  'Columbuksen hyökkääjä Max Domi onnitteli Sillingeriä kolmesta maalista Twitterissä.'
];

// VALITAAN OIKEAT ELEMENTIT
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
// let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
// let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];

  // EROTTAA JOKAISEN SANAN OMAKSI JA TEKEE NIISTÄ ELEMENTIN
  // TÄMÄN ANSIOSTA JOKAISTA TULEE OMA 
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  // MENEE ENSIMMÄISEEN LAUSEESEEN
  if (quoteNo < quotes_array.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function processCurrentText() {

  // OTTAA NYKYISEN INPUTIN JA SPLITTAA SEN
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // LASKEE JOKAISEN NÄPPÄILYN MINKÄ TEET ELI CHARACTERIN
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // CHARACTERIA EI OLE PAINETTU
    if (typedChar == null) 
    {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // OIKEA CHARACTER
    } 
    else if (typedChar === char.innerText) 
    {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      // VÄÄRÄ CHARACTER
    }
    else 
    {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      // LASKAA VÄÄRIEN NÄPPÄILYJEN MÄÄRÄN
      errors++;
    }
  });

  // NÄYTTÄÄ VÄÄRIN KIRJOITETTUJEN MÄÄRÄN
  error_text.textContent = total_errors + errors;

  // PÄIVITTÄÄ KOKOAJAN TARKKUUSTA
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  // JOS KOKO TEKSTI ON KOKONAAN VALMIS
  // VIRHEISTÄ RIIPPUMATTA

  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // VÄHENTÄÄ NYKYISTÄ AIKAA
    timeLeft--;

    // LISÄÄ AIKAA
    timeElapsed++;

    // PÄIVITTÄÄ AJAN AIKA KENTTÄÄN
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // LOPETTAA PELIN
    finishGame();
  }
}

function finishGame() {
  // LOPETTAA KELLON
  clearInterval(timer);

  // POISTTAA TEKSTINSYÖTTÖ ALUEEN
  input_area.disabled = true;

  // NÄYTTÄÄ LOPPU TEKSTIN
  quote_text.textContent = "Aloita peli painamalla tähän...";

  // NÄYTTÄÄ RESTART BUTTONIN
  restart_btn.style.display = "block";

  // LASKEE CPM JA WPM
  // cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // PÄIVITTÄÄ CPM JA WPM TEKSTIKENTÄT
  // cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // NÄYTTÄÄ CPM JA WPM TULOKSET
  // cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}

function startGame() {

  resetValues();
  updateQuote();

  // POISTAA VANHAN JA ALOITTAA UUDEN
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Aloita peli painamalla tähän...';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  // cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}