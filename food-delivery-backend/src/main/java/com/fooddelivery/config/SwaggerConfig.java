package com.fooddelivery.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Food Delivery API")
                        .version("1.0")
                        .description("Modular Monolith Food Delivery System API\n\n" +
                                "Built with Java 25 (LTS) + Spring Boot 4.1.1\n" +
                                "Spring Framework 7.x | Jakarta EE 11 | Hibernate 7.x | Jackson 3"));
    }
}
