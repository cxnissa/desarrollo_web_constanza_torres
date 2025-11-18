package cc5002.adopciones.repository;

import cc5002.adopciones.models.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Integer> {
    // spring data jpa hace la query automáticamente por el nombre del método
    List<Nota> findByAvisoId(Integer avisoId);
}