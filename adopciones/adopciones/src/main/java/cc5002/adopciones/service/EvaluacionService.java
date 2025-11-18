package cc5002.adopciones.service;

import cc5002.adopciones.dto.AvisoListadoDTO;
import cc5002.adopciones.models.AvisoAdopcion;
import cc5002.adopciones.models.Nota;
import cc5002.adopciones.repository.AvisoRepository;
import cc5002.adopciones.repository.NotaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvaluacionService {
    private final AvisoRepository avisoRepository;
    private final NotaRepository notaRepository;

    public EvaluacionService(AvisoRepository avisoRepository, NotaRepository notaRepository) {
        this.avisoRepository = avisoRepository;
        this.notaRepository = notaRepository;
    }

    @Transactional(readOnly = true)
    public List<AvisoListadoDTO> getAvisosListado() {
        List<AvisoAdopcion> avisos = avisoRepository.findAll();
        return avisos.stream()
                .map(this::avisoDTO)
                .collect(Collectors.toList());
    }

    @Transactional // para que no se buguee con lazy loading :)
    public String addNota(Integer avisoId, Integer notaValor){
        AvisoAdopcion aviso = avisoRepository.findById(avisoId)
                .orElseThrow(() -> new RuntimeException("Aviso no encontrado con id: " + avisoId));
        
        Nota nuevaNota = new Nota();
        nuevaNota.setAviso(aviso);
        nuevaNota.setNota(notaValor);
        notaRepository.save(nuevaNota);
        // busco todas las notas del aviso para calcular el promedio
        List<Nota> allNotas = notaRepository.findByAvisoId(avisoId);
        
        return promedio(allNotas);
    }

    private AvisoListadoDTO avisoDTO(AvisoAdopcion aviso){
        AvisoListadoDTO dto = new AvisoListadoDTO();
        dto.setId(aviso.getId());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        dto.setFechaPublicacion(aviso.getFechaIngreso().format(formatter));

        dto.setSector(aviso.getSector() != null ? aviso.getSector() : "");

        // formateo cantidad, tipo y edad en un string
        String tipoEdad = String.format("%d %s %d %s",
                aviso.getCantidad(),
                aviso.getTipo() != null ? aviso.getTipo() : "",
                aviso.getEdad(),
                aviso.getUnidadMedida() != null ? aviso.getUnidadMedida() : ""
        );

        dto.setCantidadTipoEdad(tipoEdad);
        dto.setComunaNombre(aviso.getComuna() != null ? aviso.getComuna().getNombre() : "");
        dto.setNotaPromedio(promedio(aviso.getNotas()));

        return dto;
    }

    private String promedio(List<Nota> notas){
        if (notas == null || notas.isEmpty()) {
            return "-"; // si no hay notas todavía
        }
        double avg = notas.stream()
                .mapToInt(Nota::getNota)
                .average()
                .orElse(0.0);
        return String.format("%.1f", avg); // redondeo a 1 decimal
    }
}

