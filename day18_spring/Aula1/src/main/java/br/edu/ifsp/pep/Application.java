package br.edu.ifsp.pep;

import br.edu.ifsp.pep.repository.CursoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.edu.ifsp.pep.model.Curso;

@SpringBootApplication
public class Application {

	private final CursoRepository cursoRepository;

    Application(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	CommandLineRunner initDatabase() {
		return args -> {
			Curso c1 = new Curso();
			c1.setNome("Angular");

			Curso c2 = new Curso();
			c2.setNome("Spring");

			cursoRepository.save(c1);
			cursoRepository.save(c2);
		};
	}
}
