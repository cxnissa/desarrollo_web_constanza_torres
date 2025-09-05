
const avisos = [
  {
    id: 1, publicacion: "2025-08-22 04:39", entrega: "2025-08-29 15:00", comuna: "Ñuñoa", sector: "Pedro de Valdivia",
    cantidad: 6, tipo: "Chinchilla", edad: "4 meses", nombre: "Agustín Moraga", contacto: "agustin.moraga@gmail.com",
    fotos: ["../img/chinchilla1.jpg", "../img/chinchilla2.jpg"]
  },
  {
    id: 2, publicacion: "2025-08-25 16:00", entrega: "2025-09-01 16:00", comuna: "Cerrillos", sector: "Municipalidad Cerrillos",
    cantidad: 3, tipo: "Oveja", edad: "5 meses", nombre: "Pedro González", contacto: "pedri.gonzalez@gmail.com",
    fotos: ["../img/oveja1.jpg"]
  },
  {
    id: 3,
    publicacion: "2025-08-28 18:51", entrega: "2025-08-30 19:00", comuna: "La Florida", sector: "Tobalaba",
    cantidad: 8, tipo: "Pato", edad: "2 meses", nombre: "Pablo Gaviera", contacto: "pablo.gaviera@gmail.com",
    fotos: ["../img/pato1.jpg", "../img/pato2.jpg"]
  },
  {
    id: 4, publicacion: "2025-09-01 15:46", entrega: "2025-09-18 12:30", comuna: "San José de Maipo", sector: "Plaza de Armas",
    cantidad: 4, tipo: "Perro", edad: "2 meses", nombre: "Fernando Vasquez", contacto: "fernando.vasquez@gmail.com",
    fotos: ["../img/perro1.jpg", "../img/perro2.jpg", "../img/perro3.jpg", "../img/perro4.jpg"]
  },
  {
    id: 5, publicacion: "2025-09-01 11:52", entrega: "2025-09-14 15:00", comuna: "Las Condes", sector: "Mall Alto Las Condes",
    cantidad: 7, tipo: "Gato", edad: "4 meses", nombre: "Isabel Peralta", contacto: "isabel.peralta@gmail.com", fotos: ["../img/gato1.jpg", "../img/gato2.jpg"]
  },
];

// document ids
const listado = document.getElementById("listado");
const detalle = document.getElementById("detalle");
const info = document.getElementById("info");
const tbody = document.querySelector("#tabla-avisos tbody");

// rellenar tabla de avisos
window.addEventListener("DOMContentLoaded", () => {

    avisos.forEach(aviso => {
        const tr = document.createElement("tr");
        tr.innerHTML =
        `<td>${aviso.publicacion}</td>
         <td>${aviso.entrega}</td>
         <td>${aviso.comuna}</td>
         <td>${aviso.sector}</td>
         <td>${aviso.cantidad}, ${aviso.tipo}<br>${aviso.edad}</td>
         <td>${aviso.nombre}<br>${aviso.contacto}</td>
         <td>
           <img src="${aviso.fotos[0]}" width="80" height="60">
           <br>
           (${aviso.fotos.length} fotos)
         </td>`;
        tr.addEventListener("click", () => {
            mostrardetalle(aviso);
        });
        tbody.appendChild(tr);
    });
});

// abrir detalle al hacer click en una fila
function mostrardetalle(aviso) {
  listado.style.display = "none";
  detalle.style.display = "block";

  info.innerHTML = 
    `<p><b>Fecha de Publicación:</b> ${aviso.publicacion}</p>
    <p><b>Fecha de Entrega:</b> ${aviso.entrega}</p>
    <p><b>Comuna:</b> ${aviso.comuna}</p>
    <p><b>Sector:</b> ${aviso.sector}</p>
    <p><b>Cantidad:</b> ${aviso.cantidad}</p>
    <p><b>Tipo:</b> ${aviso.tipo}</p>
    <p><b>Edad:</b> ${aviso.edad}</p>
    <p><b>Nombre Contacto:</b> ${aviso.nombre}</p>
    <p><b>Contacto:</b> ${aviso.contacto}</p>`;   

    const galeria = document.getElementById("galeria");
    galeria.innerHTML = ""; // reset
    aviso.fotos.forEach(f => {
        const img = document.createElement("img");
        img.src = f;
        img.style.width = "320px";
        img.style.height = "240px";
        img.addEventListener("click", () => mostrarfoto(f));
        galeria.appendChild(img);

    });

}

// overlay de foto
function mostrarfoto(src) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  overlay.innerHTML = 
    `<div class="overlay-content">
      <img src="${src}">
      <button id="cerrar">X</button>
    </div>`;

  document.body.appendChild(overlay);

  document.getElementById("cerrar").addEventListener("click", () => {
    overlay.remove();
  });
}
