document.addEventListener("DOMContentLoaded", () => {
    const formComentario = document.getElementById("form-comentario");
    const listaComentarios = document.getElementById("lista-comentarios");
    const erroresComentario = document.getElementById("errores-comentario");

    if (!formComentario) return;

    const avisoId = formComentario.dataset.avisoId;

    async function cargarComentarios() {
        // llamado a la ruta API GET
        const response = await fetch(`/api/avisos/${avisoId}/comentarios`);
        const comentarios = await response.json();

        listaComentarios.innerHTML = ""; // limpua el "Cargando"

        if (comentarios.length === 0) {
            listaComentarios.innerHTML = "<p>No hay comentarios.</p>";
        } else {
            comentarios.forEach(c => {
                const divComentario = document.createElement("div");
                divComentario.className = "comentario-item"; 
                divComentario.style.border = "1px solid #ffe5ec";
                divComentario.style.borderRadius = "8px";
                divComentario.style.padding = "10px";
                divComentario.style.marginBottom = "10px";

                divComentario.innerHTML = `
                    <p><strong>${c.nombre}</strong> <span style="font-size: 0.9em; color: #555;">(${c.fecha})</span></p>
                    <p>${c.texto}</p>
                `;
                listaComentarios.appendChild(divComentario);
            });
        }
    }

    // para enviar el formulario de nuevo comentario !!
    formComentario.addEventListener("submit", async (e) => {
            e.preventDefault(); // para que la pagina no recarge¿ue
            erroresComentario.innerHTML = ""; // se limpian los errores

            const nombre = document.getElementById("comentario-nombre").value;
            const texto = document.getElementById("comentario-texto").value;

            // validación del lado del cliente
            if (nombre.length < 3 || nombre.length > 80) {
                erroresComentario.innerHTML = "El nombre debe tener entre 3 y 80 caracteres.";
                return;
            }
            if (texto.length < 5) {
                erroresComentario.innerHTML = "El comentario debe tener al menos 5 caracteres.";
                return;
            }

            // se envian los datos a la ruta API POST con 'fetch'
            const response = await fetch(`/api/avisos/${avisoId}/comentarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre,
                    texto: texto
                })
            });

            const dataRespuesta = await response.json();

            // chequeamos la respuesta del servidor
            if (response.ok) {
                // 201 !! exito
                formComentario.reset(); // se limpia el formulario
                await cargarComentarios(); // y se recarga la lista de comentarios
            } else {
                // :c error
                // se muestran los errores del servidor
                erroresComentario.innerHTML = dataRespuesta.mensajes ? dataRespuesta.mensajes.join(", ") : "Error al enviar el comentario.";
            }
        });

    // ejecución inicial c:
    cargarComentarios();
});