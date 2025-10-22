function mostrarfoto(src) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  overlay.innerHTML = `
    <div class="overlay-content">
      <img src="${src}" alt="Foto de aviso">
      <button id="cerrar">X</button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("cerrar").addEventListener("click", () => {
    overlay.remove();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

document.addEventListener("click", (e) => {
  const img = e.target.closest("#galeria img");
  if (img) {
    mostrarfoto(img.src);
  }
});
