let mensajes = [
  { texto: "Hola! Soy un asistente virtual. ¿En qué puedo ayudarte?", tipo: "bot" }
];
let botThinkingAnimations = [
  "Bot pensando",
  "Bot pensando.",
  "Bot pensando..",
  "Bot pensando..."
];
let botResponses = [
  "Hoy es un buen día para aprender algo nuevo.",
  "¿Quieres saber un dato curioso?",
  "¡Claro! Estoy aquí para ayudarte.",
  "Lo siento, no tengo esa información en este momento.",
  "¡Eso suena interesante! Cuéntame más."
];
let toggle = false;
let thinkingInterval = null;
let thinkingIndex = 0;

const responseMap = [
  {
    keywords: ["hola", "buenas", "hey"],
    response: "¡Hola! 😊 ¿En qué puedo ayudarte?"
  },
  {
    keywords: ["precio", "cuesta", "vale"],
    response: "Los precios pueden variar. ¿Qué producto te interesa?"
  },
  {
    keywords: ["ayuda", "soporte", "problema"],
    response: "Claro, dime cuál es tu problema y te ayudo."
  },
  {
    keywords: ["gracias"],
    response: "¡De nada! 🙌"
  },
  {
    keywords: ["camiseta", "camisa", "t-shirt"],
    response: "La camiseta cuesta $19.99. ¿Quieres agregarla al carrito?"
  }
];

function getBotResponse(userMessage) {
  const text = userMessage.toLowerCase();

  for (let item of responseMap) {
    for (let keyword of item.keywords) {
      if (text.includes(keyword)) {
        return item.response;
      }
    }
  }

  return "Lo siento, no entendí eso. ¿Puedes reformularlo?";
}

function render() {
  const lista = document.getElementById("messages");
  lista.innerHTML = "";

  mensajes.forEach(m => {
    const li = document.createElement("li");
    li.className = m.tipo;
    li.textContent = m.texto;
    lista.appendChild(li);
  });
}

function sendBot(message) {
    sendSimulatedBotThinking();

    const delay = Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000;

    setTimeout(() => {
        sendSimulatedBotMessage(message);
    }, delay);
}

function sendSimulatedBotThinking(active = true) {
  const botThinking = document.getElementById("bot-thinking");

  if (active) {
    botThinking.style.display = "block";

    thinkingInterval = setInterval(() => {
      botThinking.textContent = botThinkingAnimations[thinkingIndex];
      thinkingIndex = (thinkingIndex + 1) % botThinkingAnimations.length;
    }, 200); // velocidad de la animación
  } else {
    botThinking.style.display = "none";

    clearInterval(thinkingInterval);
    thinkingInterval = null;
    thinkingIndex = 0;
  }
}

function sendSimulatedBotMessage(message) {
  mensajes.push({
    texto: message,
    tipo: "bot"
  });
  render();
  sendSimulatedBotThinking(false);
}

document.getElementById("btnAdd").onclick = function () {
  const input = document.getElementById("txtName");
  const texto = input.value;

  if (texto.trim() === "") return;

  mensajes.push({
    texto: texto,
    tipo: toggle ? "bot" : "own"
  });

  input.value = "";

  if (!toggle) {
    const botReply = getBotResponse(texto);
    sendBot(botReply);
}

  render();
};

/*document.getElementById("btnToggle").onclick = function () {
  toggle = !toggle;
};*/

render();