import React, { useState } from 'react';
import { PlusCircle, Edit3, Trash2, RefreshCw, CheckCircle2, AlertCircle, ArrowRight, Layers, ShieldCheck, Database } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

export interface RequestLog {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  status: number;
  controllerMethod: string;
  serviceAction: string;
  validationResult: 'PASSED' | 'FAILED' | 'N/A';
  payload?: any;
  response: any;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', quantity: 25, price: 29.99 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', quantity: 15, price: 89.99 },
  { id: 3, name: 'Notebook A5', category: 'Stationery', quantity: 50, price: 4.50 },
];

export const InventoryManager: React.FC = () => {
  // In-Memory state simulating Java ArrayList<Product> in ProductService
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [nextId, setNextId] = useState<number>(4);

  // Form State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  // UI Feedback
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Spring Boot Flow Inspector Logs
  const [requestLogs, setRequestLogs] = useState<RequestLog[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString(),
      method: 'GET',
      endpoint: '/api/products',
      status: 200,
      controllerMethod: 'ProductController.getAllProducts()',
      serviceAction: 'ProductService.getAllProducts() -> returns ArrayList copy',
      validationResult: 'N/A',
      response: INITIAL_PRODUCTS
    }
  ]);

  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4500);
  };

  const addLog = (log: Omit<RequestLog, 'id' | 'timestamp'>) => {
    const newLog: RequestLog = {
      ...log,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString()
    };
    setRequestLogs(prev => [newLog, ...prev.slice(0, 9)]);
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setName('');
    setCategory('');
    setQuantity('');
    setPrice('');
  };

  // Start editing
  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setQuantity(product.quantity.toString());
    setPrice(product.price.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Handler: Simulates HTTP POST or PUT into ProductController
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedQty = parseInt(quantity, 10);
    const parsedPrice = parseFloat(price);

    const payload = {
      name: name,
      category: category,
      quantity: isNaN(parsedQty) ? -1 : parsedQty,
      price: isNaN(parsedPrice) ? -1 : parsedPrice
    };

    // Business Logic Validation (enforced in ProductService.validateProduct)
    if (!name || name.trim() === '') {
      showAlert('Product name cannot be empty (Business Rule Violation)', 'error');
      addLog({
        method: editingId ? 'PUT' : 'POST',
        endpoint: editingId ? `/api/products/${editingId}` : '/api/products',
        status: 400,
        controllerMethod: editingId ? 'ProductController.updateProduct()' : 'ProductController.addProduct()',
        serviceAction: 'ProductService.validateProduct() -> throw IllegalArgumentException',
        validationResult: 'FAILED',
        payload,
        response: { error: 'Product name cannot be empty' }
      });
      return;
    }

    if (parsedQty < 0) {
      showAlert('Product quantity cannot be negative (Business Rule Violation)', 'error');
      addLog({
        method: editingId ? 'PUT' : 'POST',
        endpoint: editingId ? `/api/products/${editingId}` : '/api/products',
        status: 400,
        controllerMethod: editingId ? 'ProductController.updateProduct()' : 'ProductController.addProduct()',
        serviceAction: 'ProductService.validateProduct() -> throw IllegalArgumentException',
        validationResult: 'FAILED',
        payload,
        response: { error: 'Product quantity cannot be negative' }
      });
      return;
    }

    if (parsedPrice < 0) {
      showAlert('Product price cannot be negative (Business Rule Violation)', 'error');
      addLog({
        method: editingId ? 'PUT' : 'POST',
        endpoint: editingId ? `/api/products/${editingId}` : '/api/products',
        status: 400,
        controllerMethod: editingId ? 'ProductController.updateProduct()' : 'ProductController.addProduct()',
        serviceAction: 'ProductService.validateProduct() -> throw IllegalArgumentException',
        validationResult: 'FAILED',
        payload,
        response: { error: 'Product price cannot be negative' }
      });
      return;
    }

    // UPDATE PRODUCT
    if (editingId !== null) {
      const updatedProduct: Product = {
        id: editingId,
        name: name.trim(),
        category: category.trim() || 'General',
        quantity: parsedQty,
        price: parsedPrice
      };

      setProducts(prev => prev.map(p => p.id === editingId ? updatedProduct : p));
      showAlert(`Product #${editingId} updated successfully!`, 'success');

      addLog({
        method: 'PUT',
        endpoint: `/api/products/${editingId}`,
        status: 200,
        controllerMethod: `ProductController.updateProduct(${editingId})`,
        serviceAction: `ProductService.updateProduct(${editingId}) -> Updated in-memory ArrayList`,
        validationResult: 'PASSED',
        payload: updatedProduct,
        response: updatedProduct
      });
      resetForm();
    } else {
      // ADD PRODUCT
      const newProduct: Product = {
        id: nextId,
        name: name.trim(),
        category: category.trim() || 'General',
        quantity: parsedQty,
        price: parsedPrice
      };

      setNextId(prev => prev + 1);
      setProducts(prev => [...prev, newProduct]);
      showAlert(`Product "${newProduct.name}" added successfully!`, 'success');

      addLog({
        method: 'POST',
        endpoint: '/api/products',
        status: 201,
        controllerMethod: 'ProductController.addProduct()',
        serviceAction: `ProductService.addProduct() -> Assigned ID #${newProduct.id}, appended to ArrayList`,
        validationResult: 'PASSED',
        payload: newProduct,
        response: newProduct
      });
      resetForm();
    }
  };

  // DELETE PRODUCT
  const handleDelete = (id: number) => {
    if (!window.confirm(`Are you sure you want to delete Product #${id}?`)) {
      return;
    }

    setProducts(prev => prev.filter(p => p.id !== id));
    showAlert(`Product #${id} deleted successfully!`, 'success');

    addLog({
      method: 'DELETE',
      endpoint: `/api/products/${id}`,
      status: 200,
      controllerMethod: `ProductController.deleteProduct(${id})`,
      serviceAction: `ProductService.deleteProduct(${id}) -> Removed from in-memory ArrayList`,
      validationResult: 'PASSED',
      response: { message: 'Product deleted successfully', id }
    });

    if (editingId === id) {
      resetForm();
    }
  };

  // REFRESH
  const handleRefresh = () => {
    showAlert('Products refreshed from in-memory service', 'success');
    addLog({
      method: 'GET',
      endpoint: '/api/products',
      status: 200,
      controllerMethod: 'ProductController.getAllProducts()',
      serviceAction: `ProductService.getAllProducts() -> Returned ${products.length} products`,
      validationResult: 'N/A',
      response: products
    });
  };

  // Preset bad inputs to help students test business logic rules easily
  const fillInvalidQuantity = () => {
    setName('Damaged Item');
    setCategory('Warehouse');
    setQuantity('-10');
    setPrice('15.00');
  };

  const fillInvalidPrice = () => {
    setName('Clearance Cable');
    setCategory('Electronics');
    setQuantity('5');
    setPrice('-4.99');
  };

  return (
    <div className="space-y-8">
      {/* Alert banner */}
      {alert && (
        <div
          className={`flex items-center gap-3 p-4 rounded-lg border text-sm font-medium transition-all ${
            alert.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {alert.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Main Grid: Form + Product Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Card (Presentation Layer Component) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {editingId ? `Edit Product #${editingId}` : 'Add New Product'}
              </h2>
              <p className="text-xs text-slate-500">
                Presentation Layer Form ➔ POST / PUT to <code className="text-indigo-600">ProductController</code>
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              Unit-IV Form
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Wireless Mouse"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Rule: Cannot be empty or whitespace only.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Electronics, Stationery"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Quantity <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <p className="text-[11px] text-slate-500 mt-1">Rule: Must be ≥ 0</p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Price ($) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <p className="text-[11px] text-slate-500 mt-1">Rule: Must be ≥ 0.00</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
              >
                {editingId ? (
                  <>
                    <Edit3 className="w-4 h-4" /> Update Product
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" /> Save Product
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Quick test buttons for students */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2">Test Business Logic Failures:</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={fillInvalidQuantity}
                className="text-xs px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded border border-rose-200 transition-colors"
              >
                Populate Negative Quantity (-10)
              </button>
              <button
                type="button"
                onClick={fillInvalidPrice}
                className="text-xs px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded border border-rose-200 transition-colors"
              >
                Populate Negative Price (-4.99)
              </button>
            </div>
          </div>
        </div>

        {/* Product List Table (Presentation Layer) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Inventory Product List</h2>
                <p className="text-xs text-slate-500">
                  Total Items in In-Memory Store: <span className="font-semibold text-slate-800">{products.length}</span>
                </p>
              </div>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-3">ID</th>
                    <th className="py-3 px-3">Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3 text-right">Quantity</th>
                    <th className="py-3 px-3 text-right">Price</th>
                    <th className="py-3 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No products in inventory. Use the form to add one.
                      </td>
                    </tr>
                  ) : (
                    products.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-900">#{item.id}</td>
                        <td className="py-3 px-3 font-medium text-slate-900">{item.name}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded">
                            {item.category || 'General'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-medium">
                          <span className={item.quantity === 0 ? 'text-rose-600 font-bold' : ''}>
                            {item.quantity}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-semibold text-emerald-700">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                              title="Edit product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Storage: In-Memory <code>ArrayList&lt;Product&gt;</code> (No DB/JPA)</span>
            <span className="text-emerald-700 font-medium">Unit IV Pure Architecture</span>
          </div>
        </div>
      </div>

      {/* Spring Boot Request Flow & Three-Tier Execution Inspector */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Spring Boot Three-Tier Execution Flow Inspector
              </h3>
              <p className="text-xs text-slate-400">
                Observe how HTTP requests navigate Presentation ➔ Business Logic ➔ Domain Layer
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 bg-slate-800 rounded text-slate-300 font-mono">
            Spring DispatcherServlet Active
          </span>
        </div>

        {/* Latest Request Detailed Flow Visualizer */}
        {requestLogs[0] && (
          <div className="bg-slate-950/80 rounded-lg p-4 border border-slate-800 mb-4">
            <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-slate-800 text-slate-400">
              <span className="font-semibold text-slate-300">Latest Dispatched Request:</span>
              <span className="font-mono">{requestLogs[0].timestamp}</span>
            </div>

            {/* 3 Steps Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Step 1: Presentation Layer */}
              <div className="bg-slate-900 p-3 rounded border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[10px]">1</span>
                  Presentation Layer
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                    requestLogs[0].method === 'GET' ? 'bg-sky-900/60 text-sky-300' :
                    requestLogs[0].method === 'POST' ? 'bg-emerald-900/60 text-emerald-300' :
                    requestLogs[0].method === 'PUT' ? 'bg-amber-900/60 text-amber-300' :
                    'bg-rose-900/60 text-rose-300'
                  }`}>
                    {requestLogs[0].method}
                  </span> {requestLogs[0].endpoint}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  {requestLogs[0].controllerMethod}
                </p>
              </div>

              {/* Step 2: Business Logic Layer */}
              <div className="bg-slate-900 p-3 rounded border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">2</span>
                  Business Logic (@Service)
                </div>
                <p className="text-xs text-slate-300 font-mono">
                  {requestLogs[0].serviceAction}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                  <span className="text-slate-400">Validation:</span>
                  <span className={`font-semibold ${
                    requestLogs[0].validationResult === 'PASSED' ? 'text-emerald-400' :
                    requestLogs[0].validationResult === 'FAILED' ? 'text-rose-400' :
                    'text-slate-400'
                  }`}>
                    {requestLogs[0].validationResult}
                  </span>
                </div>
              </div>

              {/* Step 3: Domain / Store & HTTP Response */}
              <div className="bg-slate-900 p-3 rounded border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px]">3</span>
                  Response & Domain Store
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">HTTP Status:</span>
                  <span className={`font-mono font-bold px-1.5 py-0.5 rounded ${
                    requestLogs[0].status >= 200 && requestLogs[0].status < 300
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                    {requestLogs[0].status} {requestLogs[0].status === 200 ? 'OK' : requestLogs[0].status === 201 ? 'CREATED' : 'BAD REQUEST'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Target: <code>ArrayList&lt;Product&gt;</code> in memory
                </p>
              </div>
            </div>
          </div>
        )}

        {/* History log stream */}
        <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-xs text-slate-300">
          <p className="text-slate-500 text-[11px] uppercase tracking-wider mb-1">Recent Request Activity:</p>
          {requestLogs.map(log => (
            <div key={log.id} className="flex items-center justify-between py-1 px-2 rounded bg-slate-950/40 border border-slate-800/60">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${
                  log.method === 'GET' ? 'text-sky-400' :
                  log.method === 'POST' ? 'text-emerald-400' :
                  log.method === 'PUT' ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {log.method}
                </span>
                <span>{log.endpoint}</span>
                <span className="text-slate-500">➔</span>
                <span className="text-slate-400">{log.controllerMethod.split('.')[1]}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={log.status < 300 ? 'text-emerald-400' : 'text-rose-400'}>
                  HTTP {log.status}
                </span>
                <span className="text-slate-600">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
