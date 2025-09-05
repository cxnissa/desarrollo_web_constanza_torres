
const avisos = [
    { fecha: "2025-09-04", comuna: "Santiago", sector: "Centro", cant_tipo: "3 perros", edad: "2 meses", foto: "../img/p_perro1.jpg" },
    { fecha: "2025-09-04", comuna: "Puerto Montt", sector: "Av. Austral", cant_tipo: "2 gatos", edad: "3 meses", foto: "../img/p_gato1.jpg" },
    { fecha: "2025-09-03", comuna: "Buin", sector: "Sur", cant_tipo: "1 ciervo", edad: "4 meses", foto: "../img/p_deer1.jpg" },
    { fecha: "2025-09-02", comuna: "Providencia", sector: "Lyon", cant_tipo: "2 serpientes", edad: "1 mes", foto: "../img/p_snake1.jpg" },
    { fecha: "2025-09-02", comuna: "Puerto Varas", sector: "Plaza", cant_tipo: "1 perro", edad: "2 años", foto: "../img/p_perro2.jpg" },
];


window.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("table"); 

    avisos.forEach(aviso => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${aviso.fecha}</td>
            <td>${aviso.comuna}</td>
            <td class="center">${aviso.sector}</td>
            <td class="center">${aviso.cant_tipo} <br> ${aviso.edad}</td>
            <td class="center"><img src="${aviso.foto}" width="200"></td>
            `;
        tabla.appendChild(fila);
    });
});