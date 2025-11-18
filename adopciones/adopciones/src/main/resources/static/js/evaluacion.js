document.addEventListener("DOMContentLoaded", () => {

    const tablaBody = document.querySelector("tbody");
    const notaPopup = document.getElementById("nota-popup");
    const notaInput = document.getElementById("nota-input");
    const notaError = document.getElementById("nota-error");
    const btnSubmitNota = document.getElementById("btn-submit-nota");
    const btnCancelarNota = document.getElementById("btn-cancelar-nota");

    if (!tablaBody || !notaPopup) {
        console.error("No se encontraron los elementos necesarios");
        return;
    }

    // abrir pop up cuando clickean el botón evaluar
    tablaBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-evaluar")) {
            const boton = e.target;
            const avisoId = boton.dataset.avisoId;

            notaPopup.dataset.avisoId = avisoId; // guardo el id del aviso en el popup

            notaInput.value = "";
            notaError.textContent = "";

            notaPopup.classList.add("activo");
        }
    });

    btnCancelarNota.addEventListener("click", () => {
        notaPopup.classList.remove("activo");
    });

    btnSubmitNota.addEventListener("click", () => {

        const avisoId = notaPopup.dataset.avisoId;
        const notaStr = notaInput.value;
        const nota = parseInt(notaStr, 10);

        // validación del rango 1-7
        if (isNaN(nota) || nota < 1 || nota > 7) {
            notaError.textContent = "Debe ingresar un número entero entre 1 y 7.";
            return;
        }

        notaError.textContent = "";

        // llamo al endpoint del backend
        fetch(`/api/avisos/${avisoId}/evaluar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nota: nota })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || "Error del servidor")
                });
            }
            return response.json();
        })
        .then(data => {
            // actualizo el promedio en la tabla sin recargar la página
            const celdaNota = document.querySelector(`.celda-nota[data-aviso-id="${avisoId}"]`);
            if (celdaNota) {
                celdaNota.textContent = data.nuevoPromedio;
            }

            notaPopup.classList.remove("activo");
        })
        .catch(error => {
            console.error("Error al evaluar:", error);
            notaError.textContent = `Error al enviar: ${error.message}`;
        });
    });

});