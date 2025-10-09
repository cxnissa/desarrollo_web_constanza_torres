from flask import Flask, render_template, url_for, request, redirect, flash, abort
from databases.db import SessionLocal, engine
from databases.models import (
    Base, Region, Comuna, AvisoAdopcion,
    Foto, ContactarPor, TipoMascota
)
import os
from datetime import datetime 
from werkzeug.utils import secure_filename
from sqlalchemy.orm import joinedload


app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "default_key_for_dev")

UPLOAD_FOLDER = os.path.join("static", "uploads")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024

ALLOWED_EXT = {'png', 'jpg', 'jpeg'}

@app.route("/")
def portada():
    with SessionLocal() as db:
        ultimos = (
            db.query(AvisoAdopcion)
            .options(joinedload(AvisoAdopcion.comuna),
                     joinedload(AvisoAdopcion.fotos))  
            .order_by(AvisoAdopcion.fecha_ingreso.desc())
            .limit(5)
            .all()
        )
    return render_template("portada.html", ultimos=ultimos)

@app.route("/agregar", methods=["GET","POST"])
def agregar():
    if request.method == "POST":
        comuna_id = request.form.get("comuna")
        sector = request.form.get("sector")
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        celular = request.form.get("celular")
        tipo = request.form.get("tipo")
        tipo_otro = request.form.get("tipo_otro") if tipo == "otro" else None
        cantidad = request.form.get("cantidad")
        edad = request.form.get("edad")
        unidad = request.form.get("unidad")
        fecha_entrega = request.form.get("fecha-entrega")
        descripcion = request.form.get("descripcion")

        errores = []
        if not comuna_id:
            errores.append("Debe seleccionar una comuna.")
        if not nombre:
            errores.append("Debe ingresar su nombre.")
        if not email:
            errores.append("Debe ingresar su correo electrónico.")
        if not tipo:
            errores.append("Debe seleccionar un tipo de mascota.")
        if tipo == "otro" and not tipo_otro:
            errores.append("Debe especificar el tipo si eligió 'otro'.")
        if not cantidad or int(cantidad) < 1:
            errores.append("Debe indicar una cantidad válida.")
        if not edad or int(edad) < 0:
            errores.append("Debe indicar una edad válida.")
        if not unidad:
            errores.append("Debe seleccionar unidad de medida.")
        if not fecha_entrega:
            errores.append("Debe indicar una fecha de entrega.")

        if errores:
            for e in errores:
                flash(e, "error")
            with SessionLocal() as db:
                regiones = db.query(Region).all()
            return render_template("agregar.html", regiones=regiones)
        
        try:
            fecha_entrega_dt = datetime.fromisoformat(fecha_entrega)
        except Exception:
            flash("Formato de fecha inválido.", "error")
            with SessionLocal() as db:
                regiones = db.query(Region).all()
            return render_template("agregar.html", regiones=regiones)
        
        with SessionLocal() as db:
            aviso = AvisoAdopcion(
                fecha_ingreso=datetime.now(),
                comuna_id=int(comuna_id),
                sector=sector,
                nombre=nombre,
                email=email,
                celular=celular,
                tipo=TipoMascota(tipo),
                tipo_otro=tipo_otro,
                cantidad=int(cantidad),
                edad=int(edad),
                unidad_medida=unidad,
                fecha_entrega=fecha_entrega_dt,
                descripcion=descripcion
            )
            db.add(aviso)
            db.flush()

            contactar_nombres = request.form.getlist("contactar_nombre")
            contactar_ids = request.form.getlist("contactar_identificador")

            for nombre_c, ident in zip(contactar_nombres, contactar_ids):
                if nombre_c and ident:
                    db.add(ContactarPor(nombre=nombre_c, identificador=ident, aviso_id=aviso.id))

            fotos = request.files.getlist("fotos")
            for f in fotos:
                if f and f.filename:
                    ext = f.filename.rsplit(".", 1)[1].lower() if "." in f.filename else ""

                    if ext not in ALLOWED_EXT:
                        flash(f"Formato de archivo no permitido ({f.filename}). Solo JPG o PNG.", "error")
                        continue  

                    filename = secure_filename(f.filename)

                    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

                    save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                    f.save(save_path)

                    db.add(Foto(
                        ruta_archivo=f"uploads/{filename}",
                        nombre_archivo=filename,
                        aviso_id=aviso.id
                    ))

            db.commit()
            flash("Aviso agregado !", "success")
            return redirect(url_for("portada"))
    else:
        with SessionLocal() as db:
            regiones = db.query(Region).all()
        return render_template("agregar.html", regiones=regiones)
    
@app.route("/listado")
def listado():
    page = int(request.args.get("page", 1))
    per_page = 5
    with SessionLocal() as db:
        total = db.query(AvisoAdopcion).count()
        avisos = (
            db.query(AvisoAdopcion)
            .order_by(AvisoAdopcion.fecha_ingreso.desc())
            .options(
                joinedload(AvisoAdopcion.comuna),
                joinedload(AvisoAdopcion.fotos)
            )
            .offset((page - 1) * per_page)
            .limit(per_page)
            .all()
        )

    next_page = page + 1 if total > page * per_page else None
    prev_page = page - 1 if page > 1 else None

    return render_template(
        "listado.html",
        avisos=avisos,
        page=page,
        next_page=next_page,
        prev_page=prev_page
    )

@app.route("/listado/<int:aviso_id>")
def detalle_aviso(aviso_id):
    with SessionLocal() as db:
        aviso = (
            db.query(AvisoAdopcion)
            .options(
                joinedload(AvisoAdopcion.comuna),
                joinedload(AvisoAdopcion.fotos),
                joinedload(AvisoAdopcion.contactos)
            )
            .get(aviso_id)
        )
        if not aviso:
            abort(404)
    return render_template("detalle.html", aviso=aviso)


@app.route("/estadisticas")
def estadisticas():
    return render_template("estadisticas.html")

if __name__ == "__main__":
    app.run(debug=True)