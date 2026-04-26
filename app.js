/* global QRCode */

const els = {
  input: document.getElementById("textInput"),
  generateBtn: document.getElementById("generateBtn"),
  downloadBtn: document.getElementById("downloadBtn"),
  qrContainer: document.getElementById("qrContainer"),
  errorText: document.getElementById("errorText"),
};

function setError(message) {
  els.errorText.textContent = message || "";
}

function normalizeInput(raw) {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";

  // Keep this minimal: if it looks like a bare domain, add https://
  if (/^[a-z0-9.-]+\.[a-z]{2,}([/?#].*)?$/i.test(trimmed) && !/^[a-z]+:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

function clearQr() {
  els.qrContainer.innerHTML = "";
  els.downloadBtn.disabled = true;
}

function getCanvas() {
  const canvas = els.qrContainer.querySelector("canvas");
  return canvas || null;
}

async function generateQr() {
  setError("");

  if (typeof QRCode === "undefined" || !QRCode?.toCanvas) {
    setError("QR library failed to load. Refresh and try again.");
    return;
  }

  const value = normalizeInput(els.input.value);
  if (!value) {
    clearQr();
    setError("Please enter a link.");
    return;
  }

  clearQr();

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  els.qrContainer.appendChild(canvas);

  try {
    await QRCode.toCanvas(canvas, value, {
      width: 256,
      margin: 1,
      errorCorrectionLevel: "M",
      color: {
        dark: "#111111",
        light: "#ffffff",
      },
    });
    els.downloadBtn.disabled = false;
  } catch (err) {
    clearQr();
    setError("Could not generate QR for that input.");
  }
}

function downloadPng() {
  const canvas = getCanvas();
  if (!canvas) return;

  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = "qr.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

els.generateBtn.addEventListener("click", () => void generateQr());
els.downloadBtn.addEventListener("click", downloadPng);
els.input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    void generateQr();
  }
});

// Nice default for first load if user previously used it.
const storageKey = "qrmaker:lastValue";
els.input.value = localStorage.getItem(storageKey) || "";
els.input.addEventListener("input", () => {
  localStorage.setItem(storageKey, els.input.value);
});

