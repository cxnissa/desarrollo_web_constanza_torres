
const form = document.getElementById("form-aviso");
// donde
const region = document.getElementById("region");
const comuna = document.getElementById("comuna");
const sector = document.getElementById("sector");
// contacto
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const celular = document.getElementById("celular");
const contactar = document.getElementById("contactar");
const contactar_detalle = document.getElementById("contactar-detalle");
// mascota
const tipo = document.getElementById("tipo");
const tipo_extra = document.getElementById("tipo-extra");
const entrega = document.getElementById("fecha-entrega"); 
const fotos = document.getElementById("fotos-input");
// confirmación
const confirmacion = document.getElementById("confirmacion");
const btnsi = document.getElementById("btn-si");
const btnno = document.getElementById("btn-no");


window.addEventListener("DOMContentLoaded", () => { // corre el código cuando carga la pagina

    comuna.disabled = true; // primero se elige región

    // placeholder de region
    const R0 = document.createElement("option");
    R0.value = "";
    R0.textContent = "Seleccione una región";
    R0.disabled = true;
    R0.selected = true;
    region.appendChild(R0);

    // rellenamos las regiones con el javascript region_comuna.js
    region_comuna.regiones.forEach(r => {
        const opt = document.createElement("option");
        opt.value = String(r.numero);
        opt.textContent = r.nombre;
        region.appendChild(opt);
    })

    // rellenamos las comunas por region, cuando cambia la region
    region.addEventListener("change", () => {
        comuna.innerHTML= ``; // se resetea

        // placeholder de comuna
        const C0 = document.createElement("option");
        C0.value = "";
        C0.textContent = "Seleccione una comuna";
        C0.disabled = true;
        C0.selected = true;
        comuna.appendChild(C0);

        const region_actual= region_comuna.regiones.find(r => String(r.numero) === region.value);
        if (region_actual) { 
            region_actual.comunas.forEach(c => {
                const opt = document.createElement("option");
                opt.value = String(c.id);
                opt.textContent = c.nombre;
                comuna.appendChild(opt);
            });
            comuna.disabled = false; // se puede elegir
        } else { // no hay región, no se si es necesario ?
            comuna.disabled = true; 
        }
    });

    // placeholder para contactar por 
    const MC0 = document.createElement("option");
    MC0.value = "";
    MC0.textContent = "Seleccione medio de contactar";
    MC0.disabled = true;
    MC0.selected = true;
    contactar.appendChild(MC0);

    // función para agregar un nuevo input file para agregar fotos
    function addfotoinput() {
        const actuales = fotos.querySelectorAll('input[type="file"]').length;
        if (actuales >= 5) return; // límite de 5 fotos
        const input = document.createElement("input");
        input.type = "file";
        input.name = "foto";
        input.accept = "image/*";
        // cuando el usuario seleccione un archivo, se genera el siguiente
        input.addEventListener("change", () => {
            const todos = fotos.querySelectorAll('input[type="file"]');
            // cuando se añade una foto, aparece para añadir la siguiente
            if (todos[todos.length - 1].files.length > 0) {
                addfotoinput();
            }
        });
        fotos.appendChild(input);
    }

    // se agrega el primer input al cargar la página
    addfotoinput();

    // se añaden las opciones de medio de contacto
    ["Whatsapp", "Telegram", "X", "Instagram", "Tiktok", "Otra"].forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        contactar.appendChild(opt);
    });

    // se añade para ingresar id o url al seleccionar el medio de contacto
    contactar.addEventListener("change", () => {
        contactar_detalle.innerHTML = ``;
        if (contactar.value) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = "contactar-id";
            input.placeholder = "Ingrese ID o URL";
            contactar_detalle.appendChild(input);
        }
    });

    // prellenamos la fecha de entrega con la hora actual + tres
    let min_entrega = null;
    if (entrega) {
        const ahora = new Date();
        ahora.setHours(ahora.getHours() + 3); // sumamos 3 horas
    // formateamos a YYYY-MM-DDTHH:MM
    // y se realiza un ajuste de 3 horas por zona horaria chilena lol
    // ajustado a la zona horaria de verano :)
    const iso = new Date(ahora.getTime() - 3 * 60 * 60 * 1000)
                    .toISOString()
                    .slice(0,16);
        entrega.value = iso;
        min_entrega = new Date(iso);
    }

    // se añade input para insertar texto al seleccionar "otro" tipo de mascota
    tipo.addEventListener("change", () => {
        if (tipo.value === "otro") {
        tipo_extra.innerHTML = '<input type="text" id="tipo-otro" placeholder="Especifique el tipo" required>';
        } else {
        tipo_extra.innerHTML = "";
        }
    });

    // botones de confirmación
    btnsi.addEventListener("click", () => {
        // cierra el pop up y cambia el main para monstrar confirmación del envio
        confirmacion.classList.remove("activo");
        const main = document.querySelector("main");
        main.innerHTML = `
            <h2>Hemos recibido la información de adopción, muchas gracias y suerte!</h2>
            <a href="portada.html">Volver a portada</a>
        `;
    });

    btnno.addEventListener("click", () => {
        // cierra el pop up y vuelve al formulario
        confirmacion.classList.remove("activo"); 
    });

    // validación final al enviar
    form.addEventListener("submit", (e) => {

        const cantidad = parseInt(document.getElementById("cantidad")?.value || 0);
        const edad = parseInt(document.getElementById("edad")?.value || 0);
        const unidad = document.getElementById("unidad").value;
        const contactar_id = document.getElementById("contactar-id");

        e.preventDefault();
        let errores = [];

        // donde 
        if (!region.value) errores.push("Debe seleccionar una región");
        if (!comuna.value) errores.push("Debe seleccionar una comuna");
        if (sector.value.trim().length > 100) errores.push("El sector no puede tener más de 100 caracteres");

        // contacto
        if (nombre.value.trim().length < 3 || nombre.value.trim().length > 200) errores.push("Largo de nombre no permitido");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) || email.value.trim().length > 100) errores.push("Email inválido");
        if (celular.value && !/^\+\d{1,3}(\.?[0-9]{8,12})$/.test(celular.value)) {
            errores.push("Formato de celular inválido (+56912345678 o +569.12345678)");
        }
            if (contactar_id) {
            const val = contactar_id.value.trim();
            if (val.length < 4 || val.length > 50) {
                errores.push("El ID o URL de contactar debe tener entre 4 y 50 caracteres");
            }
        }

        // mascota
        if (!tipo.value) errores.push("Debe seleccionar tipo de mascota");     
        if (cantidad < 1) errores.push("Cantidad inválida");    
        if (edad < 1) errores.push("Edad inválida");
        if (!unidad) errores.push("Debe seleccionar unidad de edad");
        if (!entrega.value) { errores.push("Debe indicar fecha de entrega");
        } else if (new Date(entrega.value) < min_entrega) {
            errores.push("La fecha debe ser posterior al valor prellenado");
        }
        const archivos = fotos.querySelectorAll('input[type="file"]');
        if (![...archivos].some(i => i.files.length > 0)) {
            errores.push("Debe subir al menos 1 foto");
        }
        if (errores.length > 0) {
            alert("Errores:\n- " + errores.join("\n- "));
            return;
        }

        // pop up de confirmación de envio
        confirmacion.classList.add("activo");

    });
});