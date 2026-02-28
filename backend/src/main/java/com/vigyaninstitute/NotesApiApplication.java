package com.vigyaninstitute;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * NotesApiApplication - Main Spring Boot application class
 * Entry point for the Notes Upload API
 */
@SpringBootApplication
public class NotesApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotesApiApplication.class, args);
        System.out.println("=================================");
        System.out.println("  Vigyan Institute Notes API");
        System.out.println("  Server started successfully!");
        System.out.println("  Access: http://localhost:8080");
        System.out.println("  API Docs: http://localhost:8080/swagger-ui.html");
        System.out.println("=================================");
    }
}
