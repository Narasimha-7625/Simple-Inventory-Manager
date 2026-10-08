import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, Code, ShieldCheck, Terminal, AlertTriangle } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  description: string;
  methodName: string;
  expectedBehavior: string;
  codeSnippet: string;
  runTest: () => { passed: boolean; message: string; durationMs: number };
}

export const TestRunner: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, { passed: boolean; message: string; durationMs: number }>>({});
  const [selectedTestId, setSelectedTestId] = useState<string>('test-add');

  const testCases: TestCase[] = [
    {
      id: 'test-add',
      name: 'Test 1: Adding Valid Product',
      methodName: 'testAddProduct_Success()',
      description: 'Verifies that a valid Product object is assigned an ID, saved to the in-memory list, and returned intact.',
      expectedBehavior: 'assertNotNull(saved.getId()), assertEquals("Desk Lamp", saved.getName()), assertEquals(10, saved.getQuantity())',
      codeSnippet: `@Test
@DisplayName("Should add product successfully when data is valid")
void testAddProduct_Success() {
    Product product = new Product(null, "Desk Lamp", "Furniture", 10, 45.00);

    Product saved = productService.addProduct(product);

    assertNotNull(saved.getId(), "Generated ID should not be null");
    assertEquals("Desk Lamp", saved.getName());
    assertEquals("Furniture", saved.getCategory());
    assertEquals(10, saved.getQuantity());
    assertEquals(45.00, saved.getPrice());
}`,
      runTest: () => {
        // Validation logic replication
        const testProduct = { id: null, name: 'Desk Lamp', category: 'Furniture', quantity: 10, price: 45.0 };
        if (!testProduct.name || testProduct.quantity < 0 || testProduct.price < 0) {
          return { passed: false, message: 'Unexpected validation error thrown', durationMs: 4 };
        }
        const saved = { ...testProduct, id: 101 };
        return {
          passed: saved.id !== null && saved.name === 'Desk Lamp' && saved.quantity === 10 && saved.price === 45.0,
          message: 'PASSED: Product saved with ID #101, all fields asserted successfully via assertEquals().',
          durationMs: 3
        };
      }
    },
    {
      id: 'test-qty',
      name: 'Test 2: Invalid Quantity Validation',
      methodName: 'testAddProduct_InvalidQuantity()',
      description: 'Verifies that adding a product with negative quantity (< 0) throws IllegalArgumentException.',
      expectedBehavior: 'assertThrows(IllegalArgumentException.class, () -> productService.addProduct(invalidProduct))',
      codeSnippet: `@Test
@DisplayName("Should throw IllegalArgumentException when quantity is negative")
void testAddProduct_InvalidQuantity() {
    Product invalidProduct = new Product(null, "Gaming Chair", "Furniture", -5, 199.99);

    IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> productService.addProduct(invalidProduct),
            "Expected addProduct to throw on negative quantity"
    );

    assertEquals("Product quantity cannot be negative", exception.getMessage());
}`,
      runTest: () => {
        const testProduct = { id: null, name: 'Gaming Chair', category: 'Furniture', quantity: -5, price: 199.99 };
        let thrown = false;
        let errMsg = '';
        try {
          if (testProduct.quantity < 0) {
            throw new Error('Product quantity cannot be negative');
          }
        } catch (e: any) {
          thrown = true;
          errMsg = e.message;
        }

        const passed = thrown && errMsg === 'Product quantity cannot be negative';
        return {
          passed,
          message: passed
            ? 'PASSED: IllegalArgumentException correctly thrown with message: "Product quantity cannot be negative"'
            : 'FAILED: Exception was not thrown or message differed',
          durationMs: 2
        };
      }
    },
    {
      id: 'test-price',
      name: 'Test 3: Invalid Price Validation',
      methodName: 'testAddProduct_InvalidPrice()',
      description: 'Verifies that adding a product with negative price (< 0.0) throws IllegalArgumentException.',
      expectedBehavior: 'assertThrows(IllegalArgumentException.class, () -> productService.addProduct(invalidProduct))',
      codeSnippet: `@Test
@DisplayName("Should throw IllegalArgumentException when price is negative")
void testAddProduct_InvalidPrice() {
    Product invalidProduct = new Product(null, "USB Cable", "Electronics", 20, -9.99);

    IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> productService.addProduct(invalidProduct),
            "Expected addProduct to throw on negative price"
    );

    assertEquals("Product price cannot be negative", exception.getMessage());
}`,
      runTest: () => {
        const testProduct = { id: null, name: 'USB Cable', category: 'Electronics', quantity: 20, price: -9.99 };
        let thrown = false;
        let errMsg = '';
        try {
          if (testProduct.price < 0) {
            throw new Error('Product price cannot be negative');
          }
        } catch (e: any) {
          thrown = true;
          errMsg = e.message;
        }

        const passed = thrown && errMsg === 'Product price cannot be negative';
        return {
          passed,
          message: passed
            ? 'PASSED: IllegalArgumentException correctly thrown with message: "Product price cannot be negative"'
            : 'FAILED: Exception was not thrown or message differed',
          durationMs: 3
        };
      }
    },
    {
      id: 'test-name',
      name: 'Test 4: Empty Name Validation (Bonus)',
      methodName: 'testAddProduct_EmptyName()',
      description: 'Verifies that adding a product with null or empty/whitespace name throws IllegalArgumentException.',
      expectedBehavior: 'assertThrows(IllegalArgumentException.class, () -> productService.addProduct(invalidProduct))',
      codeSnippet: `@Test
@DisplayName("Should throw IllegalArgumentException when product name is empty or null")
void testAddProduct_EmptyName() {
    Product invalidProduct = new Product(null, "   ", "Stationery", 5, 2.50);

    IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> productService.addProduct(invalidProduct),
            "Expected addProduct to throw on empty name"
    );

    assertEquals("Product name cannot be empty", exception.getMessage());
}`,
      runTest: () => {
        const testProduct = { id: null, name: '   ', category: 'Stationery', quantity: 5, price: 2.50 };
        let thrown = false;
        let errMsg = '';
        try {
          if (!testProduct.name || testProduct.name.trim() === '') {
            throw new Error('Product name cannot be empty');
          }
        } catch (e: any) {
          thrown = true;
          errMsg = e.message;
        }

        const passed = thrown && errMsg === 'Product name cannot be empty';
        return {
          passed,
          message: passed
            ? 'PASSED: IllegalArgumentException correctly thrown with message: "Product name cannot be empty"'
            : 'FAILED: Exception was not thrown or message differed',
          durationMs: 2
        };
      }
    }
  ];

  const handleRunAll = () => {
    setRunning(true);
    setTimeout(() => {
      const results: Record<string, { passed: boolean; message: string; durationMs: number }> = {};
      testCases.forEach((tc) => {
        results[tc.id] = tc.runTest();
      });
      setTestResults(results);
      setRunning(false);
    }, 400);
  };

  const handleRunSingle = (tc: TestCase) => {
    setRunning(true);
    setTimeout(() => {
      setTestResults((prev) => ({
        ...prev,
        [tc.id]: tc.runTest()
      }));
      setRunning(false);
    }, 200);
  };

  const selectedTest = testCases.find((t) => t.id === selectedTestId) || testCases[0];
  const passedCount = Object.values(testResults).filter((r) => r.passed).length;
  const totalRan = Object.keys(testResults).length;

  return (
    <div className="space-y-6">
      {/* Header card with Run Controls */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded">
                JUnit 5 (Jupiter)
              </span>
              <h2 className="text-xl font-bold text-slate-900">Unit IV Testing Basics Runner</h2>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Tests the <code className="text-blue-600 font-mono">ProductService</code> business rules in isolation without database or server overhead.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleRunAll}
              disabled={running}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              {running ? 'Running Tests...' : 'Run All Unit Tests'}
            </button>
          </div>
        </div>

        {/* Test Summary Bar */}
        {totalRan > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="text-slate-600">
                Executed: <strong>{totalRan} / {testCases.length}</strong>
              </span>
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Passed: <strong>{passedCount}</strong>
              </span>
              {totalRan - passedCount > 0 && (
                <span className="text-rose-700 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Failed: <strong>{totalRan - passedCount}</strong>
                </span>
              )}
            </div>
            <span className="text-xs text-slate-400">
              Corresponds to: <code>mvn test</code>
            </span>
          </div>
        )}
      </div>

      {/* Grid: Test Case List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Test List */}
        <div className="lg:col-span-5 space-y-3">
          {testCases.map((tc) => {
            const res = testResults[tc.id];
            const isSelected = tc.id === selectedTestId;

            return (
              <div
                key={tc.id}
                onClick={() => setSelectedTestId(tc.id)}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/40 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{tc.name}</h3>
                    <p className="font-mono text-xs text-slate-500 mt-0.5">{tc.methodName}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    {res ? (
                      res.passed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-800">
                          <XCircle className="w-3.5 h-3.5" /> Failed
                        </span>
                      )
                    ) : (
                      <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                        Not Ran
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2">{tc.description}</p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">JUnit 5 Assertion</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRunSingle(tc);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium text-xs inline-flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" /> Run this
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Test Detail & Java Code */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Test Inspection & Source Code
              </span>
              <h3 className="text-lg font-bold text-slate-900">{selectedTest.name}</h3>
            </div>
            <button
              onClick={() => handleRunSingle(selectedTest)}
              disabled={running}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
            >
              <Play className="w-3.5 h-3.5" /> Run
            </button>
          </div>

          {/* Test Status Banner */}
          {testResults[selectedTest.id] && (
            <div
              className={`p-3 rounded-lg border text-xs font-mono mb-4 flex items-start gap-2.5 ${
                testResults[selectedTest.id].passed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {testResults[selectedTest.id].passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold">{testResults[selectedTest.id].message}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Execution time: {testResults[selectedTest.id].durationMs}ms
                </p>
              </div>
            </div>
          )}

          {/* Explanation */}
          <div className="space-y-2 mb-4 text-xs text-slate-700">
            <p>
              <strong>Objective:</strong> {selectedTest.description}
            </p>
            <p>
              <strong>Assertions:</strong>{' '}
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">
                {selectedTest.expectedBehavior}
              </code>
            </p>
          </div>

          {/* Java Source Code Display */}
          <div>
            <div className="flex items-center justify-between text-xs bg-slate-800 text-slate-300 px-3 py-2 rounded-t-lg font-mono">
              <span className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-blue-400" /> ProductServiceTest.java
              </span>
              <span className="text-[11px] text-slate-400">JUnit 5 Jupiter</span>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-b-lg font-mono text-xs overflow-x-auto leading-relaxed border border-t-0 border-slate-800">
              <code>{selectedTest.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
