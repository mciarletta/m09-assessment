package learn.ffback;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//add the SpringBootApplication annotation
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        //add the SpringApplication to handle DI and all Spring stuff
        SpringApplication.run(App.class, args);
    }
}