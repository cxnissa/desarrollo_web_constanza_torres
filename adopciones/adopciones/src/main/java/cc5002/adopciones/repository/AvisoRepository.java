package cc5002.adopciones.repository;

import cc5002.adopciones.models.AvisoAdopcion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvisoRepository extends JpaRepository<AvisoAdopcion, Integer> {
}