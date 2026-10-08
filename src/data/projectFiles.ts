export interface ProjectFile {
  path: string;
  name: string;
  category: 'java' | 'config' | 'test' | 'frontend' | 'doc';
  language: string;
  description: string;
  content: string;
}

export const PROJECT_FILES: ProjectFile[] = [
  {
    path: 'pom.xml',
    name: 'pom.xml',
    category: 'config',
    language: 'xml',
    description: 'Maven Project Object Model: configures Spring Boot Starter Web and Starter Test dependencies.',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
        <relativePath/>
    </parent>

    <groupId>com.inventory</groupId>
    <artifactId>simple-inventory-manager</artifactId>
    <version>1.0.0</version>
    <name>Simple Inventory Manager</name>
    <description>Tutorial 4 - Unit IV: Simple 3-Tier Spring Boot Application with In-Memory Storage</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starter Web: Includes embedded Tomcat, Spring MVC, REST support, and Jackson JSON mapper -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot Starter Test: Includes JUnit Jupiter, Mockito, and AssertJ -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Spring Boot Maven Plugin: packages executable JAR and runs via mvn spring-boot:run -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    path: 'src/main/java/com/inventory/SimpleInventoryApplication.java',
    name: 'SimpleInventoryApplication.java',
    category: 'java',
    language: 'java',
    description: 'Main Spring Boot application entry point with @SpringBootApplication.',
    content: `package com.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application Entry Point (Unit IV).
 * 
 * @SpringBootApplication is a convenience meta-annotation combining:
 * 1. @Configuration: Tags the class as a source of bean definitions.
 * 2. @EnableAutoConfiguration: Instructs Spring Boot to automatically configure beans based on classpath.
 * 3. @ComponentScan: Enables component scanning in the com.inventory package.
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
}`
  },
  {
    path: 'src/main/java/com/inventory/model/Product.java',
    name: 'Product.java',
    category: 'java',
    language: 'java',
    description: 'Domain Layer POJO representing the Product model with id, name, category, quantity, price.',
    content: `package com.inventory.model;

/**
 * Domain Model representing a Product in the Inventory.
 * Part of the Domain Layer (Unit IV).
 */
public class Product {
    private Long id;
    private String name;
    private String category;
    private int quantity;
    private double price;

    // Default constructor (required for JSON deserialization by Jackson)
    public Product() {
    }

    // Parameterized constructor
    public Product(Long id, String name, String category, int quantity, double price) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}`
  },
  {
    path: 'src/main/java/com/inventory/service/ProductService.java',
    name: 'ProductService.java',
    category: 'java',
    language: 'java',
    description: 'Business Logic / Service Layer implementing validation rules and in-memory ArrayList storage.',
    content: `package com.inventory.service;

import com.inventory.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Service Layer / Business Logic Layer (Unit IV).
 * Annotated with @Service so Spring registers it as a bean in the ApplicationContext.
 * Uses an in-memory ArrayList for storage without relying on JPA or databases.
 */
@Service
public class ProductService {

    // In-memory data storage (Unit IV requirement: no JPA / Hibernate)
    private final List<Product> productList = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public ProductService() {
        // Seed initial sample inventory
        addProduct(new Product(null, "Wireless Mouse", "Electronics", 25, 29.99));
        addProduct(new Product(null, "Mechanical Keyboard", "Electronics", 15, 89.99));
        addProduct(new Product(null, "Notebook A5", "Stationery", 50, 4.50));
    }

    /**
     * Retrieve all products from in-memory list.
     */
    public List<Product> getAllProducts() {
        return new ArrayList<>(productList);
    }

    /**
     * Find a single product by ID.
     */
    public Optional<Product> getProductById(Long id) {
        return productList.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }

    /**
     * Add a new product with Business Logic Validation.
     * Business rules:
     * 1. Product name cannot be empty
     * 2. Product quantity cannot be negative
     * 3. Product price cannot be negative
     */
    public Product addProduct(Product product) {
        validateProduct(product);

        product.setId(idCounter.getAndIncrement());
        productList.add(product);
        return product;
    }

    /**
     * Update an existing product by ID.
     */
    public Product updateProduct(Long id, Product updatedData) {
        validateProduct(updatedData);

        for (int i = 0; i < productList.size(); i++) {
            Product current = productList.get(i);
            if (current.getId().equals(id)) {
                current.setName(updatedData.getName().trim());
                current.setCategory(updatedData.getCategory());
                current.setQuantity(updatedData.getQuantity());
                current.setPrice(updatedData.getPrice());
                return current;
            }
        }
        throw new IllegalArgumentException("Product not found with id: " + id);
    }

    /**
     * Delete product by ID.
     */
    public boolean deleteProduct(Long id) {
        return productList.removeIf(p -> p.getId().equals(id));
    }

    /**
     * Business Logic Validation rules.
     */
    public void validateProduct(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null");
        }
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Product name cannot be empty");
        }
        if (product.getQuantity() < 0) {
            throw new IllegalArgumentException("Product quantity cannot be negative");
        }
        if (product.getPrice() < 0.0) {
            throw new IllegalArgumentException("Product price cannot be negative");
        }
    }
}`
  },
  {
    path: 'src/main/java/com/inventory/controller/ProductController.java',
    name: 'ProductController.java',
    category: 'java',
    language: 'java',
    description: 'Presentation / REST Controller Layer exposing GET, POST, PUT, DELETE with Dependency Injection.',
    content: `package com.inventory.controller;

import com.inventory.model.Product;
import com.inventory.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Presentation Layer / Web Controller (Unit IV).
 * Annotated with @RestController (combines @Controller and @ResponseBody).
 * Demonstrates Dependency Injection of ProductService.
 * Handles HTTP requests: GET, POST, PUT, DELETE.
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    // Dependency Injection: Service layer is injected into Controller
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * GET /api/products
     * Retrieve all products.
     */
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    /**
     * GET /api/products/{id}
     * Retrieve a product by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Product not found with id: " + id)));
    }

    /**
     * POST /api/products
     * Add a new product (handles business validation errors).
     */
    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {
            Product created = productService.addProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    /**
     * PUT /api/products/{id}
     * Update an existing product.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        try {
            Product updated = productService.updateProduct(id, product);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    /**
     * DELETE /api/products/{id}
     * Delete a product by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Product deleted successfully", "id", id));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Product not found with id: " + id));
        }
    }
}`
  },
  {
    path: 'src/main/resources/application.properties',
    name: 'application.properties',
    category: 'config',
    language: 'properties',
    description: 'Spring Boot configuration file for server port and app name.',
    content: `# Spring Boot Application Properties
# Tutorial 4 - Simple Inventory Manager

# Server Port
server.port=8080

# Application Name
spring.application.name=simple-inventory-manager`
  },
  {
    path: 'src/main/resources/static/index.html',
    name: 'index.html (Presentation)',
    category: 'frontend',
    language: 'html',
    description: 'Static HTML frontend served by Spring Boot for the product form and product table.',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Inventory Manager - Spring Boot Tutorial 4</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="app-header">
        <div class="header-content">
            <h1>Simple Inventory Manager</h1>
            <p class="subtitle">Full Stack Web Development • Tutorial 4 (Unit IV)</p>
        </div>
    </header>

    <main class="container">
        <!-- Message Alert Banner -->
        <div id="alertBanner" class="alert hidden"></div>

        <!-- Section: Add / Edit Product Form -->
        <section class="card form-card">
            <h2 id="formTitle">Add New Product</h2>
            <form id="productForm">
                <input type="hidden" id="productId">

                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Product Name *</label>
                        <input type="text" id="name" required placeholder="e.g. Wireless Mouse">
                    </div>

                    <div class="form-group">
                        <label for="category">Category</label>
                        <input type="text" id="category" placeholder="e.g. Electronics">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="quantity">Quantity *</label>
                        <input type="number" id="quantity" min="0" required placeholder="0">
                        <small class="helper-text">Rule: Must be ≥ 0</small>
                    </div>

                    <div class="form-group">
                        <label for="price">Price ($) *</label>
                        <input type="number" id="price" step="0.01" min="0" required placeholder="0.00">
                        <small class="helper-text">Rule: Must be ≥ 0.00</small>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" id="submitBtn" class="btn btn-primary">Save Product</button>
                    <button type="button" id="cancelEditBtn" class="btn btn-secondary hidden">Cancel Edit</button>
                </div>
            </form>
        </section>

        <!-- Section: Product List Table -->
        <section class="card table-card">
            <div class="table-header-bar">
                <h2>Product Inventory List</h2>
                <button id="refreshBtn" class="btn btn-sm">Refresh List</button>
            </div>

            <div class="table-responsive">
                <table class="inventory-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="productTableBody">
                        <tr>
                            <td colspan="6" class="loading-cell">Loading products from Spring Boot REST API...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <footer class="app-footer">
        <p>Spring Boot Architecture: Presentation Layer (Controller & HTML/JS) ➔ Service Layer (Validation) ➔ Domain Layer (Product POJO)</p>
    </footer>

    <script src="app.js"></script>
</body>
</html>`
  },
  {
    path: 'src/main/resources/static/style.css',
    name: 'style.css (Styling)',
    category: 'frontend',
    language: 'css',
    description: 'Clean, modern styling for the inventory manager frontend.',
    content: `/* Tutorial 4: Simple Inventory Manager CSS */
:root {
    --primary: #2563eb;
    --primary-hover: #1d4ed8;
    --danger: #dc2626;
    --danger-hover: #b91c1c;
    --success: #16a34a;
    --border: #e2e8f0;
    --bg-card: #ffffff;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --bg-page: #f8fafc;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

body {
    background-color: var(--bg-page);
    color: var(--text-main);
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.app-header {
    background: #1e293b;
    color: white;
    padding: 1.5rem 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-content {
    max-width: 900px;
    margin: 0 auto;
}

.header-content h1 {
    font-size: 1.75rem;
    font-weight: 700;
}

.subtitle {
    color: #94a3b8;
    font-size: 0.9rem;
    margin-top: 0.25rem;
}

.container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
    flex: 1;
}

.card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.card h2 {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
    color: #1e293b;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

@media (max-width: 600px) {
    .form-row {
        grid-template-columns: 1fr;
    }
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.35rem;
    color: #334155;
}

.form-group input {
    padding: 0.6rem 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.15s;
}

.form-group input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

.helper-text {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
}

.form-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
}

.btn {
    cursor: pointer;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1.25rem;
    font-weight: 600;
    font-size: 0.9rem;
    transition: background-color 0.15s;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover {
    background: var(--primary-hover);
}

.btn-secondary {
    background: #64748b;
    color: white;
}

.btn-secondary:hover {
    background: #475569;
}

.btn-danger {
    background: var(--danger);
    color: white;
}

.btn-danger:hover {
    background: var(--danger-hover);
}

.btn-sm {
    padding: 0.35rem 0.65rem;
    font-size: 0.8rem;
    border-radius: 4px;
}

.table-header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.table-header-bar h2 {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
}

.table-responsive {
    overflow-x: auto;
}

.inventory-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.925rem;
}

.inventory-table th, .inventory-table td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
}

.inventory-table th {
    background-color: #f1f5f9;
    color: #475569;
    font-weight: 600;
}

.inventory-table tr:hover {
    background-color: #f8fafc;
}

.inventory-table td.actions-cell {
    white-space: nowrap;
}

.inventory-table td.actions-cell button {
    margin-right: 0.4rem;
}

.alert {
    padding: 0.75rem 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
}

.alert-success {
    background-color: #dcfce7;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.alert-error {
    background-color: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
}

.hidden {
    display: none;
}

.app-footer {
    text-align: center;
    padding: 1.5rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    border-top: 1px solid var(--border);
    background: white;
}`
  },
  {
    path: 'src/main/resources/static/app.js',
    name: 'app.js (Client Script)',
    category: 'frontend',
    language: 'javascript',
    description: 'Fetch API calls connecting the presentation layer to Spring Boot REST endpoints.',
    content: `// Tutorial 4: Simple Inventory Manager Frontend Client
// Communicates with Spring Boot @RestController endpoints via fetch() API

const API_BASE = '/api/products';

const productForm = document.getElementById('productForm');
const productIdInput = document.getElementById('productId');
const nameInput = document.getElementById('name');
const categoryInput = document.getElementById('category');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const refreshBtn = document.getElementById('refreshBtn');
const productTableBody = document.getElementById('productTableBody');
const alertBanner = document.getElementById('alertBanner');

function showAlert(message, type = 'success') {
    alertBanner.textContent = message;
    alertBanner.className = \`alert alert-\${type}\`;
    alertBanner.classList.remove('hidden');
    setTimeout(() => {
        alertBanner.classList.add('hidden');
    }, 4000);
}

// 1. READ: Fetch all products (GET /api/products)
async function fetchProducts() {
    try {
        const response = await fetch(API_BASE);
        if (!response.ok) {
            throw new Error(\`Server returned HTTP \${response.status}\`);
        }
        const products = await response.json();
        renderTable(products);
    } catch (error) {
        productTableBody.innerHTML = \`<tr><td colspan="6" style="color:red; text-align:center;">Failed to load products: \${error.message}</td></tr>\`;
    }
}

// Render products table
function renderTable(products) {
    if (!products || products.length === 0) {
        productTableBody.innerHTML = \`<tr><td colspan="6" style="text-align:center; color:#64748b;">No products in inventory yet. Add one above!</td></tr>\`;
        return;
    }

    productTableBody.innerHTML = products.map(product => \`
        <tr>
            <td><strong>#\${product.id}</strong></td>
            <td>\${escapeHtml(product.name)}</td>
            <td>\${escapeHtml(product.category || '-')}</td>
            <td>\${product.quantity}</td>
            <td>$\${Number(product.price).toFixed(2)}</td>
            <td class="actions-cell">
                <button class="btn btn-secondary btn-sm" onclick="startEdit(\${product.id}, '\${escapeHtml(product.name)}', '\${escapeHtml(product.category || '')}', \${product.quantity}, \${product.price})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(\${product.id})">Delete</button>
            </td>
        </tr>
    \`).join('');
}

// 2. CREATE or UPDATE: Handle form submission
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = productIdInput.value;
    const productData = {
        name: nameInput.value.trim(),
        category: categoryInput.value.trim(),
        quantity: parseInt(quantityInput.value, 10),
        price: parseFloat(priceInput.value)
    };

    if (!productData.name) {
        showAlert('Product name cannot be empty', 'error');
        return;
    }
    if (isNaN(productData.quantity) || productData.quantity < 0) {
        showAlert('Quantity cannot be negative', 'error');
        return;
    }
    if (isNaN(productData.price) || productData.price < 0) {
        showAlert('Price cannot be negative', 'error');
        return;
    }

    try {
        let response;
        if (id) {
            // PUT /api/products/{id}
            response = await fetch(\`\${API_BASE}/\${id}\`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        } else {
            // POST /api/products
            response = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Server error occurred');
        }

        showAlert(id ? 'Product updated successfully!' : 'Product added successfully!', 'success');
        resetForm();
        fetchProducts();
    } catch (error) {
        showAlert(error.message, 'error');
    }
});

// Set form to edit mode
window.startEdit = function(id, name, category, quantity, price) {
    productIdInput.value = id;
    nameInput.value = name;
    categoryInput.value = category;
    quantityInput.value = quantity;
    priceInput.value = price;

    formTitle.textContent = \`Edit Product #\${id}\`;
    submitBtn.textContent = 'Update Product';
    cancelEditBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

cancelEditBtn.addEventListener('click', resetForm);

function resetForm() {
    productIdInput.value = '';
    productForm.reset();
    formTitle.textContent = 'Add New Product';
    submitBtn.textContent = 'Save Product';
    cancelEditBtn.classList.add('hidden');
}

// 3. DELETE: Remove product
window.deleteProduct = async function(id) {
    if (!confirm(\`Are you sure you want to delete Product #\${id}?\`)) {
        return;
    }

    try {
        const response = await fetch(\`\${API_BASE}/\${id}\`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to delete');
        }

        showAlert(\`Product #\${id} deleted successfully!\`, 'success');
        fetchProducts();
    } catch (error) {
        showAlert(error.message, 'error');
    }
};

refreshBtn.addEventListener('click', fetchProducts);

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

fetchProducts();`
  },
  {
    path: 'src/test/java/com/inventory/ProductServiceTest.java',
    name: 'ProductServiceTest.java',
    category: 'test',
    language: 'java',
    description: 'Unit Tests for ProductService testing valid addition, negative quantity, negative price.',
    content: `package com.inventory;

import com.inventory.model.Product;
import com.inventory.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Basic Unit Testing for Service Layer (Unit IV).
 * Demonstrates basic JUnit 5 assertions and testing business logic in isolation.
 */
public class ProductServiceTest {

    private ProductService productService;

    @BeforeEach
    void setUp() {
        productService = new ProductService();
    }

    /**
     * Test 1: Verify successful addition of a valid product
     */
    @Test
    @DisplayName("Should add product successfully when data is valid")
    void testAddProduct_Success() {
        Product product = new Product(null, "Desk Lamp", "Furniture", 10, 45.00);

        Product saved = productService.addProduct(product);

        assertNotNull(saved.getId(), "Generated ID should not be null");
        assertEquals("Desk Lamp", saved.getName());
        assertEquals("Furniture", saved.getCategory());
        assertEquals(10, saved.getQuantity());
        assertEquals(45.00, saved.getPrice());
    }

    /**
     * Test 2: Verify business rule - Product quantity cannot be negative
     */
    @Test
    @DisplayName("Should throw IllegalArgumentException when quantity is negative")
    void testAddProduct_InvalidQuantity() {
        Product invalidProduct = new Product(null, "Gaming Chair", "Furniture", -5, 199.99);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> productService.addProduct(invalidProduct),
                "Expected addProduct to throw on negative quantity"
        );

        assertEquals("Product quantity cannot be negative", exception.getMessage());
    }

    /**
     * Test 3: Verify business rule - Product price cannot be negative
     */
    @Test
    @DisplayName("Should throw IllegalArgumentException when price is negative")
    void testAddProduct_InvalidPrice() {
        Product invalidProduct = new Product(null, "USB Cable", "Electronics", 20, -9.99);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> productService.addProduct(invalidProduct),
                "Expected addProduct to throw on negative price"
        );

        assertEquals("Product price cannot be negative", exception.getMessage());
    }

    /**
     * Bonus Unit IV Test: Verify business rule - Product name cannot be empty
     */
    @Test
    @DisplayName("Should throw IllegalArgumentException when product name is empty or null")
    void testAddProduct_EmptyName() {
        Product invalidProduct = new Product(null, "   ", "Stationery", 5, 2.50);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> productService.addProduct(invalidProduct),
                "Expected addProduct to throw on empty name"
        );

        assertEquals("Product name cannot be empty", exception.getMessage());
    }
}`
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'doc',
    language: 'markdown',
    description: 'Instructions on setting up, building, running, and testing the Spring Boot project.',
    content: `# Simple Inventory Manager (Tutorial 4 - Unit IV)

A lightweight Spring Boot application built to demonstrate **Unit IV: Full Stack Web Development** concepts.

## Unit IV Focus
- **Spring & Spring Boot**: Rapid bootstrapping with spring-boot-starter-web
- **Auto-Configuration**: Zero XML configuration, automatic Tomcat, DispatcherServlet, and Jackson configuration
- **Three-Layer Architecture**:
  - Presentation Layer: ProductController (@RestController) & Static HTML/CSS/JS frontend
  - Business Logic Layer: ProductService (@Service) with validation rules
  - Domain Layer: Product POJO
- **In-Memory Storage**: Uses Java ArrayList (no database, JPA, or Hibernate as per Unit-IV scope)
- **Unit Testing**: JUnit 5 test suite in ProductServiceTest.java

## How to Run
\`\`\`bash
mvn clean spring-boot:run
\`\`\`
Visit http://localhost:8080 in your browser.

## Run Unit Tests
\`\`\`bash
mvn test
\`\`\``
  }
];
