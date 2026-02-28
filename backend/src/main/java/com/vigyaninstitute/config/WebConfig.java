package com.vigyaninstitute.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * WebConfig - Configuration for web-related settings
 * Handles CORS configuration and static resource serving
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.upload.dir}")
    private String uploadDir;

    /**
     * Configure CORS settings
     * Allows cross-origin requests from frontend
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api")
                .allowedOrigins("http://localhost:3000") // Allow all origins (configure for production)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // 1 hour
    }

    /**
     * Configure static resource handlers
     * Serves uploaded files from the uploads directory
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Expose upload directory as static resource
        registry.addResourceHandler("/api/notes/download/**")
                .addResourceLocations("file:" + uploadDir + "/");
        
        // Optional: Expose uploads directory directly (alternative approach)
        // registry.addResourceHandler("/uploads/**")
        //        .addResourceLocations("file:" + uploadDir + "/");
    }
}
