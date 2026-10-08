# Simple Inventory Manager (Tutorial 4 - Unit IV)

A lightweight Spring Boot application built to demonstrate **Unit IV: Full Stack Web Development** concepts.

## Unit IV Focus
- **Spring & Spring Boot**: Rapid bootstrapping with `spring-boot-starter-web`
- **Auto-Configuration**: Zero XML configuration, automatic Tomcat, DispatcherServlet, and Jackson configuration
- **Three-Layer Architecture**:
  - **Presentation Layer**: `ProductController` (`@RestController`) & Static HTML/CSS/JS frontend
  - **Business Logic Layer**: `ProductService` (`@Service`) with validation rules
  - **Domain Layer**: `Product` POJO
- **In-Memory Storage**: Uses Java `ArrayList` (no database, JPA, or Hibernate as per Unit-IV scope)
- **Unit Testing**: JUnit 5 test suite in `ProductServiceTest.java`

---

## Prerequisites
- Java JDK 17 or higher
- Apache Maven 3.8+ (or Maven wrapper)

---

## How to Run

1. Open terminal inside `simple-inventory-manager`:
   ```bash
   mvn clean spring-boot:run
   ```

2. Open your web browser:
   ```text
   http://localhost:8080
   ```

3. Run Unit Tests:
   ```bash
   mvn test
   ```

---

## REST API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Retrieve all products |
| `GET` | `/api/products/{id}` | Retrieve single product by ID |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/{id}` | Update product by ID |
| `DELETE` | `/api/products/{id}` | Delete product by ID |
