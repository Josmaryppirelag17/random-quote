const quoteBtn = document.querySelector(".wrapper__button");
const soundBtn = document.querySelector(".sound");
const jsonUrl = "quotes.json";
let allQuotes = [];

// Cargar todas las frases desde el archivo JSON
function loadAllQuotes() {
  fetch(jsonUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }
      return response.json();
    })
    .then((data) => {
      allQuotes = data;
      // Mostrar una frase aleatoria al cargar la página por primera vez
      displayRandomQuote();
    })
    .catch((error) => {
      console.error("Error al cargar las frases:", error);
    });
}

// Obtener una frase aleatoria del arreglo de frases
function getRandomQuote() {
  // Agregar una clase de carga para indicar que se está cargando una nueva cita
  quoteBtn.classList.add("Loading");
  const randomIndex = Math.floor(Math.random() * allQuotes.length);
  const randomQuote = allQuotes.splice(randomIndex, 1)[0];

  return randomQuote;
}

// Mostrar una frase aleatoria en el DOM
function displayRandomQuote() {
  if (allQuotes.length > 0) {
    const quote = getRandomQuote();
    document.querySelector(".quote").textContent = quote.quote;
    document.querySelector(".name").textContent = quote.author;
  } else {
    console.log("Todas las frases han sido mostradas."); // Mensaje opcional
    loadAllQuotes();// Aquí puedes reiniciar el ciclo o mostrar un mensaje indicando que todas las frases han sido mostradas
  }
}

//Función para copiar una cita al portapapeles
function speakQuote() {
  const quote = document.querySelector(".quote").textContent;
  const author = document.querySelector(".name").textContent;
  const speech = new SpeechSynthesisUtterance(`${quote} por ${author}`);
  window.speechSynthesis.speak(speech);
}

soundBtn.addEventListener("click", speakQuote);


function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("¡Cita copiada!");
    })
    .catch((error) => {
      console.error("Error al copiar al portapapeles: ", error);
    });
}

// Escuchar el evento de clic en el botón de copia para copiar la cita actual
document.querySelector(".copy").addEventListener("click", () => {
  const quoteText = document.querySelector(".quote").textContent;
  const author = document.querySelector(".name").textContent;
  const textToCopy = `${quoteText} - ${author}`;
  copyToClipboard(textToCopy);
});

//Funcion para publicar una cita en X
function tweetQuote() {
  const quote = document.querySelector(".quote").textContent;
  const author = document.querySelector(".name").textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Escuchar el evento de clic en el botón de Twitter para publicar la cita en Twitter
document.querySelector(".twitter").addEventListener("click", tweetQuote);


// Cargar todas las frases al cargar la página
window.addEventListener("load", loadAllQuotes);

// Escuchar el evento de clic en el botón para mostrar una nueva frase
quoteBtn.addEventListener("click", displayRandomQuote);
