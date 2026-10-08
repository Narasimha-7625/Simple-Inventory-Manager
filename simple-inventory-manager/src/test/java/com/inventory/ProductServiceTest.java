package com.inventory;

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
}
