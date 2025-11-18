package cc5002.adopciones.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "comuna")
public class Comuna {
    @Id
    private Integer id;
    private String nombre;

    // setters y getters
    public Integer getId() {
        return id;
    }
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setId(Integer id) {
        this.id = id;
    }
}
