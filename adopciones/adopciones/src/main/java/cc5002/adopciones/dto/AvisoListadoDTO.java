package cc5002.adopciones.dto;

public class AvisoListadoDTO {
    private Integer id;
    private String fechaPublicacion;
    private String sector;
    private String cantidadTipoEdad;
    private String comunaNombre;
    private String notaPromedio;
    
    // setters y getters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFechaPublicacion() {
        return fechaPublicacion;
    }

    public void setFechaPublicacion(String fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getCantidadTipoEdad() {
        return cantidadTipoEdad;
    }

    public void setCantidadTipoEdad(String cantidadTipoEdad) {
        this.cantidadTipoEdad = cantidadTipoEdad;
    }

    public String getComunaNombre() {
        return comunaNombre;
    }

    public void setComunaNombre(String comunaNombre) {
        this.comunaNombre = comunaNombre;
    }

    public String getNotaPromedio() {
        return notaPromedio;
    }

    public void setNotaPromedio(String notaPromedio) {
        this.notaPromedio = notaPromedio;
    }
}
