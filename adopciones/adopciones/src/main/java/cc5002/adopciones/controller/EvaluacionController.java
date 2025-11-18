package cc5002.adopciones.controller;

import cc5002.adopciones.service.EvaluacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class EvaluacionController {

    private final EvaluacionService evaluacionService;

    public EvaluacionController(EvaluacionService evaluacionService) {
        this.evaluacionService = evaluacionService;
    }

    // endpoint para agregar una nota a un aviso
    @PostMapping("/avisos/{id}/evaluar")
    public ResponseEntity<?> addNota(
            @PathVariable("id") Integer avisoId,
            @RequestBody Map<String, Integer> load) {
        try {
            Integer notaObj = load.get("nota");
            // validación de rango 1-7
            if (notaObj == null || notaObj < 1 || notaObj > 7) {
                return ResponseEntity.badRequest().body(Map.of("error", "Nota no valida"));
            }
            int nota = notaObj;
            // se llama al service que guarda la nota y calcula el nuevo promedio
            String newAvg = evaluacionService.addNota(avisoId, nota);
            return ResponseEntity.ok().body(Map.of("nuevoPromedio", newAvg));
        } catch (Exception e) {
            // si algo falla, error 500
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
