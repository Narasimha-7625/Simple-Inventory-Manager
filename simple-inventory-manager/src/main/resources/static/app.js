// Tutorial 4: Simple Inventory Manager Frontend Client
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

// Show notification banner
function showAlert(message, type = 'success') {
    alertBanner.textContent = message;
    alertBanner.className = `alert alert-${type}`;
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
            throw new Error(`Server returned HTTP ${response.status}`);
        }
        const products = await response.json();
        renderTable(products);
    } catch (error) {
        productTableBody.innerHTML = `<tr><td colspan="6" style="color:red; text-align:center;">Failed to load products: ${error.message}</td></tr>`;
    }
}

// Render products table
function renderTable(products) {
    if (!products || products.length === 0) {
        productTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#64748b;">No products in inventory yet. Add one above!</td></tr>`;
        return;
    }

    productTableBody.innerHTML = products.map(product => `
        <tr>
            <td><strong>#${product.id}</strong></td>
            <td>${escapeHtml(product.name)}</td>
            <td>${escapeHtml(product.category || '-')}</td>
            <td>${product.quantity}</td>
            <td>$${Number(product.price).toFixed(2)}</td>
            <td class="actions-cell">
                <button class="btn btn-secondary btn-sm" onclick="startEdit(${product.id}, '${escapeHtml(product.name)}', '${escapeHtml(product.category || '')}', ${product.quantity}, ${product.price})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// 2. CREATE or UPDATE: Handle form submission (POST /api/products or PUT /api/products/{id})
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = productIdInput.value;
    const productData = {
        name: nameInput.value.trim(),
        category: categoryInput.value.trim(),
        quantity: parseInt(quantityInput.value, 10),
        price: parseFloat(priceInput.value)
    };

    // Client-side quick check
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
            response = await fetch(`${API_BASE}/${id}`, {
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

    formTitle.textContent = `Edit Product #${id}`;
    submitBtn.textContent = 'Update Product';
    cancelEditBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Cancel edit
cancelEditBtn.addEventListener('click', resetForm);

function resetForm() {
    productIdInput.value = '';
    productForm.reset();
    formTitle.textContent = 'Add New Product';
    submitBtn.textContent = 'Save Product';
    cancelEditBtn.classList.add('hidden');
}

// 3. DELETE: Remove product (DELETE /api/products/{id})
window.deleteProduct = async function(id) {
    if (!confirm(`Are you sure you want to delete Product #${id}?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to delete');
        }

        showAlert(`Product #${id} deleted successfully!`, 'success');
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

// Initial load
fetchProducts();
