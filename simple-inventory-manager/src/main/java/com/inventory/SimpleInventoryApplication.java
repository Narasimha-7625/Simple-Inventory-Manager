package com.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application Entry Point (Unit IV).
 * 
 * @SpringBootApplication is a meta-annotation that bundles:
 * 1. @Configuration: Tags the class as the source of bean definitions.
 * 2. @EnableAutoConfiguration: Tells Spring Boot to start adding beans based on classpath settings.
 * 3. @ComponentScan: Tells Spring to look for other components, configurations, and services in the com.inventory package.
 */
@SpringBootApplication
public class SimpleInventoryApplication {

    public static void main(String[] args) {
        SpringApplication.run(SimpleInventoryApplication.class, args);
        System.out.println("=================================================");
        System.out.println(" Simple Inventory Manager (Unit IV Tutorial 4)");
        System.out.println(" Application started at http://localhost:8080");
        System.out.println("=================================================");
    }
}
