const steps = [
  {
    id: "usd",
    group: "usd",
    title: "Dólares",
    prompt: "¿Cuántos dólares hay?",
    helper: "Se mostrarán separados y no se sumarán al total en pesos.",
    image: "./assets/img/dolar.png",
    imageLabel: "Dólares",
    value: 0,
    unit: "USD"
  },
  {
    id: "mxn-500",
    group: "bills",
    title: "Billetes de $500",
    prompt: "¿Cuántos billetes de $500 hay?",
    helper: "Ingresa la cantidad de billetes, no el importe.",
    image: "./assets/img/500.png",
    imageLabel: "Billete de $500",
    value: 500
  },
  {
    id: "mxn-200",
    group: "bills",
    title: "Billetes de $200",
    prompt: "¿Cuántos billetes de $200 hay?",
    helper: "Ingresa la cantidad de billetes, no el importe.",
    image: "./assets/img/200.png",
    imageLabel: "Billete de $200",
    value: 200
  },
  {
    id: "mxn-100",
    group: "bills",
    title: "Billetes de $100",
    prompt: "¿Cuántos billetes de $100 hay?",
    helper: "Ingresa la cantidad de billetes, no el importe.",
    image: "./assets/img/100.png",
    imageLabel: "Billete de $100",
    value: 100
  },
  {
    id: "mxn-50",
    group: "bills",
    title: "Billetes de $50",
    prompt: "¿Cuántos billetes de $50 hay?",
    helper: "Ingresa la cantidad de billetes, no el importe.",
    image: "./assets/img/50.png",
    imageLabel: "Billete de $50",
    value: 50
  },
  {
    id: "mxn-20",
    group: "bills",
    title: "Billetes de $20",
    prompt: "¿Cuántos billetes de $20 hay?",
    helper: "Ingresa la cantidad de billetes, no el importe.",
    image: "./assets/img/20.png",
    imageLabel: "Billete de $20",
    value: 20
  },
  {
    id: "mxn-10",
    group: "coins",
    title: "Monedas de $10",
    prompt: "¿Cuántas monedas de $10 hay?",
    helper: "Ingresa la cantidad de monedas, no el importe.",
    image: "./assets/img/10.png",
    imageLabel: "Moneda de $10",
    value: 10
  },
  {
    id: "mxn-5",
    group: "coins",
    title: "Monedas de $5",
    prompt: "¿Cuántas monedas de $5 hay?",
    helper: "Ingresa la cantidad de monedas, no el importe.",
    image: "./assets/img/5.png",
    imageLabel: "Moneda de $5",
    value: 5
  },
  {
    id: "mxn-2",
    group: "coins",
    title: "Monedas de $2",
    prompt: "¿Cuántas monedas de $2 hay?",
    helper: "Ingresa la cantidad de monedas, no el importe.",
    image: "./assets/img/2.png",
    imageLabel: "Moneda de $2",
    value: 2
  },
  {
    id: "mxn-1",
    group: "coins",
    title: "Monedas de $1",
    prompt: "¿Cuántas monedas de $1 hay?",
    helper: "Ingresa la cantidad de monedas, no el importe.",
    image: "./assets/img/1.png",
    imageLabel: "Moneda de $1",
    value: 1
  },
  {
    id: "mxn-050",
    group: "coins",
    title: "Monedas de $0.50",
    prompt: "¿Cuántas monedas de $0.50 hay?",
    helper: "Ingresa la cantidad de monedas de cincuenta centavos.",
    image: "./assets/img/050.png",
    imageLabel: "Moneda de $0.50",
    value: 0.5
  }
];

const screen = document.querySelector("#screen");
const statusPill = document.querySelector("#statusPill");
const progressBar = document.querySelector("#progressBar");

const state = {
  currentStep: 0,
  entries: Object.fromEntries(steps.map((step) => [step.id, ""]))
};

const pesosFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2
});

const integerFormatter = new Intl.NumberFormat("es-MX", {
  maximumFractionDigits: 0
});

function formatPesos(value) {
  return `${pesosFormatter.format(value)} MXN`;
}

function getNumericEntry(stepId) {
  const raw = state.entries[stepId];
  if (raw === "" || raw === null || raw === undefined) return 0;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function setHeaderForStep() {
  const totalSteps = steps.length;
  const visualStep = Math.min(state.currentStep + 1, totalSteps);
  statusPill.textContent = `Paso ${visualStep} de ${totalSteps}`;
  progressBar.style.width = `${(visualStep / totalSteps) * 100}%`;
}

function setHeaderForSummary() {
  statusPill.textContent = "Resumen";
  progressBar.style.width = "100%";
}

function renderStep() {
  setHeaderForStep();

  const step = steps[state.currentStep];
  const currentValue = state.entries[step.id];

  screen.innerHTML = `
    <div class="step-content">
      <div class="question-block">
        <h2>${step.prompt}</h2>
        <p>${step.helper}</p>
      </div>

      <div class="denomination-image-wrap">
        <img
          class="denomination-image"
          src="${step.image}"
          alt="${step.imageLabel}"
          onerror="this.style.display='none'; this.nextElementSibling.hidden=false;"
        />
        <div class="image-fallback" hidden>
          <strong>Imagen pendiente</strong>
          <span>${step.imageLabel}</span>
        </div>
      </div>

      <div class="amount-panel">
        <div class="amount-label">Cantidad</div>
        <div class="amount-display ${currentValue === "" ? "is-empty" : ""}" id="amountDisplay">
          ${currentValue === "" ? "0" : integerFormatter.format(Number(currentValue))}
        </div>
        <p class="subtotal-hint" id="subtotalHint">${getSubtotalHint(step)}</p>
      </div>

      <div class="keypad" aria-label="Teclado numérico">
        ${["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((key) => `
          <button class="key" type="button" data-key="${key}" aria-label="Número ${key}">${key}</button>
        `).join("")}
        <button class="key secondary" type="button" data-action="clear">Limpiar</button>
        <button class="key" type="button" data-key="0" aria-label="Número 0">0</button>
        <button class="key secondary" type="button" data-action="backspace">Borrar</button>
      </div>

      <div class="nav-actions">
        <button class="button secondary" type="button" id="backButton" ${state.currentStep === 0 ? "disabled" : ""}>Atrás</button>
        <button class="button primary" type="button" id="nextButton">Siguiente</button>
      </div>
    </div>
  `;

  screen.querySelector(".keypad").addEventListener("click", handleKeypadClick);
  screen.querySelector("#backButton").addEventListener("click", goBack);
  screen.querySelector("#nextButton").addEventListener("click", goNext);
}

function getSubtotalHint(step) {
  const quantity = getNumericEntry(step.id);

  if (step.group === "usd") {
    return quantity > 0
      ? `Se registrarán ${integerFormatter.format(quantity)} USD separados del total en pesos.`
      : "Si no hay dólares, puedes dejarlo en 0 y continuar.";
  }

  const subtotal = quantity * step.value;
  return `${integerFormatter.format(quantity)} x ${formatPesos(step.value)} = ${formatPesos(subtotal)}`;
}

function updateAmountDisplay() {
  const step = steps[state.currentStep];
  const display = screen.querySelector("#amountDisplay");
  const subtotalHint = screen.querySelector("#subtotalHint");
  const raw = state.entries[step.id];

  display.textContent = raw === "" ? "0" : integerFormatter.format(Number(raw));
  display.classList.toggle("is-empty", raw === "");
  subtotalHint.textContent = getSubtotalHint(step);
}

function handleKeypadClick(event) {
  const keyButton = event.target.closest("button");
  if (!keyButton) return;

  const step = steps[state.currentStep];
  const key = keyButton.dataset.key;
  const action = keyButton.dataset.action;
  const current = state.entries[step.id];

  if (key !== undefined) {
    const nextValue = (current + key).replace(/^0+(?=\d)/, "");
    state.entries[step.id] = nextValue.slice(0, 6);
  }

  if (action === "backspace") {
    state.entries[step.id] = current.slice(0, -1);
  }

  if (action === "clear") {
    state.entries[step.id] = "";
  }

  updateAmountDisplay();
}

function normalizeCurrentEntry() {
  const step = steps[state.currentStep];
  if (state.entries[step.id] === "") {
    state.entries[step.id] = "0";
  }
}

function goBack() {
  if (state.currentStep === 0) return;
  normalizeCurrentEntry();
  state.currentStep -= 1;
  renderStep();
}

function goNext() {
  normalizeCurrentEntry();

  if (state.currentStep < steps.length - 1) {
    state.currentStep += 1;
    renderStep();
    return;
  }

  renderSummary();
}

function calculatePesoTotal() {
  return steps
    .filter((step) => step.group !== "usd")
    .reduce((total, step) => total + getNumericEntry(step.id) * step.value, 0);
}

function getCurrentDateText() {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date());
}

function buildSummaryRows(group) {
  return steps
    .filter((step) => step.group === group)
    .map((step) => {
      const quantity = getNumericEntry(step.id);
      const subtotal = quantity * step.value;

      return `
        <div class="summary-row">
          <span>${step.title}: ${integerFormatter.format(quantity)}</span>
          <strong>${formatPesos(subtotal)}</strong>
        </div>
      `;
    })
    .join("");
}

function renderSummary() {
  setHeaderForSummary();

  const usdStep = steps.find((step) => step.group === "usd");
  const usdQuantity = getNumericEntry(usdStep.id);
  const totalPesos = calculatePesoTotal();
  const dateText = getCurrentDateText();

  screen.innerHTML = `
    <div class="summary">
      <div class="summary-title">
        <h2>Resumen del corte</h2>
        <p>${dateText}</p>
      </div>

      <div class="summary-card">
        <div class="summary-section">
          <h3>Dólares</h3>
          <div class="summary-row">
            <span>Dólares registrados</span>
            <strong>${integerFormatter.format(usdQuantity)} USD</strong>
          </div>
        </div>

        <div class="summary-section">
          <h3>Billetes</h3>
          ${buildSummaryRows("bills")}
        </div>

        <div class="summary-section">
          <h3>Monedas</h3>
          ${buildSummaryRows("coins")}
        </div>
      </div>

      <div class="total-box">
        <span>Total en pesos</span>
        <strong>${formatPesos(totalPesos)}</strong>
      </div>

      <div class="summary-actions">
        <button class="button whatsapp" type="button" id="whatsappButton">Enviar por WhatsApp</button>
        <button class="button secondary" type="button" id="newCutButton">Nuevo corte</button>
      </div>
    </div>
  `;

  screen.querySelector("#whatsappButton").addEventListener("click", shareToWhatsApp);
  screen.querySelector("#newCutButton").addEventListener("click", resetCut);
}

function buildWhatsappMessage() {
  const lines = [];
  const totalPesos = calculatePesoTotal();
  const usdStep = steps.find((step) => step.group === "usd");
  const usdQuantity = getNumericEntry(usdStep.id);

  lines.push("Corte de caja");
  lines.push(getCurrentDateText());
  lines.push("");
  lines.push("Dólares:");
  lines.push(`${integerFormatter.format(usdQuantity)} USD`);
  lines.push("");
  lines.push("Billetes:");

  steps
    .filter((step) => step.group === "bills")
    .forEach((step) => {
      const quantity = getNumericEntry(step.id);
      const subtotal = quantity * step.value;
      lines.push(`${step.title.replace("Billetes de ", "")} x ${integerFormatter.format(quantity)} = ${formatPesos(subtotal)}`);
    });

  lines.push("");
  lines.push("Monedas:");

  steps
    .filter((step) => step.group === "coins")
    .forEach((step) => {
      const quantity = getNumericEntry(step.id);
      const subtotal = quantity * step.value;
      lines.push(`${step.title.replace("Monedas de ", "")} x ${integerFormatter.format(quantity)} = ${formatPesos(subtotal)}`);
    });

  lines.push("");
  lines.push("Total en pesos:");
  lines.push(formatPesos(totalPesos));

  return lines.join("\n");
}

function shareToWhatsApp() {
  const message = buildWhatsappMessage();
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.location.href = whatsappUrl;
}

function resetCut() {
  Object.keys(state.entries).forEach((key) => {
    state.entries[key] = "";
  });

  state.currentStep = 0;
  renderStep();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // La app sigue funcionando aunque el navegador no permita registrar el service worker.
    });
  });
}

renderStep();
