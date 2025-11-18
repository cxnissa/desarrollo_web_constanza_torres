# CC5002 - Tarea 4

## Base de datos

Realice modificaciones a la base de datos `tarea2` para esta tarea, los he hecho desde su creación, pero hasta ahora asumí que se compartian al equipo docente, mis disculpas por eso, si se parte de la base de datos original, la aplicación fallará!! ya que la entidad `AvisoAdopcion.java` depende de las siguientes columnas:

* **`unidad_medida`**: La entidad espera esta columna para leer `'años'` o `'meses'`. Este cambio fue realizado en tareas pasadas (vía `ALTER TABLE`). El DTO de esta aplicación (`AvisoListadoDTO`) lee este valor para formatear correctamente la columna 'Cantidad, Tipo, Edad'.
* **`tipo` y `tipo_otro`**: La base de datos también fue modificada para admitir el tipo `"otro"` y una columna `tipo_otro`. Aunque estas columnas no se usan activamente en la lógica de *esta tarea*, son parte de la estructura de la tabla `aviso_adopcion` que la entidad mapea.

En esta ocasión, los cambios **si** fueron incluidos en el archivo `tarea2.sql` para crear la base de datos !

---

## Decisiones de diseño

Para esta tarea, se implementó la arquitectura **Modelo-Servicio-Controlador**

* **Modelos (`/models`):**
    * Solo se incluyeron los campos de `aviso_adopcion` estrictamente necesarios para esta tarea (ID, fecha, sector, cantidad, tipo, edad, unidad_medida), omitiendo el resto.

* **DTO (`/dto`):**
    * Se usa un DTO (`AvisoListadoDTO`) para la lógica de la vista.
    * El servicio formatea los datos en este objeto y el controlador solo se lo pasa a Thymeleaf. Esto es más limpio que usar un `Map` !

* **Controladores (`/controller`):**
    * Se decidió separar las responsabilidades en dos controladores, siguiendo el patrón de la auxiliar

---

El desarollo de la T4 se encuentra en la carpeta `adopciones` mientras que la pagina que se tenía de la tarea previa se encuentra en `T3`, ambas cuentan con un hyperlink hacía la otra que solo funciona si ambas estan corriendo a la vez :) 
