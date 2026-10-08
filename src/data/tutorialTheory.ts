export interface VivaQuestion {
  id: number;
  question: string;
  answer: string;
  unitTopic: string;
}

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    question: "What is Spring Boot and how does it differ from the core Spring Framework?",
    answer: "Spring Framework is a comprehensive enterprise framework that requires extensive XML or Java-based configuration and external application server deployment (like standalone Tomcat). Spring Boot is an opinionated extension built on top of Spring that radically simplifies development through auto-configuration, starter dependencies, and embedded servers (like embedded Tomcat), providing a production-ready application with minimal setup.",
    unitTopic: "Spring Boot Basics"
  },
  {
    id: 2,
    question: "What is the role of @SpringBootApplication annotation?",
    answer: "It is a convenience meta-annotation that wraps three essential annotations: 1) @Configuration (marks the class as a configuration class defining beans), 2) @EnableAutoConfiguration (enables Spring Boot's smart auto-configuration mechanism based on classpath libraries), and 3) @ComponentScan (scans the current package and sub-packages for @Component, @Service, @Repository, and @RestController beans).",
    unitTopic: "Spring Boot Auto-Configuration"
  },
  {
    id: 3,
    question: "How does Spring Boot auto-configuration work under the hood?",
    answer: "Auto-configuration scans the classpath during startup. When it detects specific libraries (e.g. spring-boot-starter-web), it automatically registers matching beans (such as DispatcherServlet, Jackson ObjectMapper, and starts embedded Tomcat) using conditional annotations like @ConditionalOnClass, @ConditionalOnMissingBean, and @ConditionalOnWebApplication.",
    unitTopic: "Auto-Configuration"
  },
  {
    id: 4,
    question: "What is the Three-Layer (Three-Tier) Architecture and why is it used?",
    answer: "The Three-Layer Architecture enforces Separation of Concerns (SoC) by dividing the application into: 1) Presentation Layer (Controller: handles HTTP requests, status codes, serialization), 2) Business Logic / Service Layer (Service: contains business validation, calculations, rules), and 3) Domain / Persistence Layer (Model: represents data structures and entities). This makes applications modular, testable, maintainable, and loosely coupled.",
    unitTopic: "Three-Tier Architecture"
  },
  {
    id: 5,
    question: "What is the difference between @Controller and @RestController in Spring?",
    answer: "@Controller is traditional Spring MVC used for returning server-rendered views (JSP, Thymeleaf). @RestController is a specialized convenience annotation combining @Controller and @ResponseBody. In @RestController, every handler method automatically serializes the returned Java objects directly into JSON (or XML) response bodies via Jackson.",
    unitTopic: "Presentation Layer"
  },
  {
    id: 6,
    question: "What is Dependency Injection (DI) and how is it demonstrated in this project?",
    answer: "Dependency Injection is a design pattern where an object receives its dependencies from an external assembler (Spring Inversion of Control - IoC container) rather than instantiating them itself. In this project, ProductController receives ProductService via constructor injection (@Autowired), decoupling the controller from the service's lifecycle management.",
    unitTopic: "Spring Basics & DI"
  },
  {
    id: 7,
    question: "Why do we use an in-memory ArrayList for storage in Unit IV instead of Spring Data JPA/Hibernate?",
    answer: "Unit IV focuses on the fundamentals of Spring, Spring Boot scaffolding, dependency injection, REST controllers, service validation, and unit testing. Database connectivity, Object-Relational Mapping (ORM), JPA, and Hibernate belong to advanced Unit V topics. An in-memory ArrayList fulfills the persistence requirement for demonstrating CRUD operations without introducing database overhead.",
    unitTopic: "Domain Modelling & In-Memory Store"
  },
  {
    id: 8,
    question: "What are the HTTP request methods mapped in our ProductController and what do they represent?",
    answer: "1) GET (@GetMapping): Safe, idempotent retrieval of products (/api/products and /api/products/{id}). 2) POST (@PostMapping): Creating a new product. 3) PUT (@PutMapping): Updating an existing product by id. 4) DELETE (@DeleteMapping): Removing a product by id.",
    unitTopic: "REST API & Request Mappings"
  },
  {
    id: 9,
    question: "What business logic rules are enforced in ProductService and how are violations handled?",
    answer: "Three rules are enforced: 1) Product name cannot be null or blank, 2) Quantity cannot be negative (< 0), and 3) Price cannot be negative (< 0.0). When violated, the service throws an IllegalArgumentException, which the ProductController catches to return an HTTP 400 Bad Request response containing the descriptive error message.",
    unitTopic: "Business Logic Layer"
  },
  {
    id: 10,
    question: "What is the purpose of unit testing in Spring Boot and how do we test ProductService without starting a server?",
    answer: "Unit testing verifies that individual components (methods and business rules) function correctly in isolation. By testing ProductService as a plain Java object (POJO) with JUnit 5 (using @Test and assertThrows), tests execute in milliseconds without the overhead of booting up the entire Spring ApplicationContext or web server.",
    unitTopic: "Testing Basics"
  }
];

export const UNIT_IV_TOPIC_MAPPINGS = [
  {
    topic: "Spring Framework Fundamentals",
    concepts: "Inversion of Control (IoC), Dependency Injection (DI), Spring Bean lifecycle",
    projectImplementation: "ProductService registered via @Service; injected into ProductController via constructor injection (@Autowired)."
  },
  {
    topic: "Spring Boot Basics & Environment",
    concepts: "Rapid project bootstrapping, Maven pom.xml with spring-boot-starter-parent, embedded Tomcat",
    projectImplementation: "Maven starter dependencies (spring-boot-starter-web, spring-boot-starter-test) and executable jar plugin."
  },
  {
    topic: "Spring Boot Auto-Configuration",
    concepts: "@SpringBootApplication, conditional configuration, zero-XML setup",
    projectImplementation: "SimpleInventoryApplication.java boots up Tomcat on port 8080 and configures Jackson JSON parser automatically."
  },
  {
    topic: "Three-Tier / Three-Layer Architecture",
    concepts: "Separation of Presentation, Business Logic, and Domain layers",
    projectImplementation: "ProductController (Presentation) ➔ ProductService (Business Rules) ➔ Product (Domain Model) + ArrayList."
  },
  {
    topic: "Domain Modelling",
    concepts: "Plain Old Java Objects (POJOs), entity fields, encapsulation",
    projectImplementation: "Product.java with id, name, category, quantity, price, getters, setters, default & parameterized constructors."
  },
  {
    topic: "Business Logic Implementation",
    concepts: "Input validation, domain invariants, exception handling",
    projectImplementation: "validateProduct() checks: quantity >= 0, price >= 0.0, non-blank name; throws IllegalArgumentException on violation."
  },
  {
    topic: "Presentation Layer (REST & Web)",
    concepts: "RESTful endpoints, HTTP verbs (GET, POST, PUT, DELETE), JSON serialization, static web resources",
    projectImplementation: "ProductController with @RestController, @GetMapping, @PostMapping, @PutMapping, @DeleteMapping; static HTML/CSS/JS in classpath:/static/."
  },
  {
    topic: "Testing Basics",
    concepts: "Unit testing with JUnit 5, assertions, testing edge cases and exceptions",
    projectImplementation: "ProductServiceTest.java tests valid product addition, negative quantity rejection, and negative price rejection using assertThrows()."
  }
];
