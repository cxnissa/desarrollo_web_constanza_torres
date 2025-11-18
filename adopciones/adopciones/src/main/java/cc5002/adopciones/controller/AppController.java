package cc5002.adopciones.controller;

import cc5002.adopciones.dto.AvisoListadoDTO;
import cc5002.adopciones.service.EvaluacionService;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
public class AppController {
    private final EvaluacionService evaluacionService;

    public AppController(EvaluacionService evaluacionService) {
        this.evaluacionService = evaluacionService;
    }

    @GetMapping("/evaluaciones")
    public String showEvaluaciones(Model model) {
        List<AvisoListadoDTO> avisos = evaluacionService.getAvisosListado();
        model.addAttribute("avisos", avisos);
        return "evaluaciones";
    }
}
