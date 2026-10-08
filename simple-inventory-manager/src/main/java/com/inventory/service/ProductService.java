package com.inventory.service;

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
}
