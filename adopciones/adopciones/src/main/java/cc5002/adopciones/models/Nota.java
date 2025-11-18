package cc5002.adopciones.models;

import jakarta.persistence.*;

@Entity
@Table(name = "nota")
public class Nota {
    @Id
    // la bd genera el id automáticamente
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer nota;

    // muchas notas pueden pertenecer a un aviso, ManyToOne
    @ManyToOne
    @JoinColumn(name = "aviso_id")
    private AvisoAdopcion aviso;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public AvisoAdopcion getAviso() {
        return aviso;
    }

    public void setAviso(AvisoAdopcion aviso) {
        this.aviso = aviso;
    }
}
