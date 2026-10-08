import React, { useState } from 'react';
import { VIVA_QUESTIONS, UNIT_IV_TOPIC_MAPPINGS } from '../data/tutorialTheory';
import {
  BookOpen,
  FolderTree,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Globe,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TheoryGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'spring' | 'threelayer' | 'logic' | 'testing' | 'mapping' | 'viva'>('architecture');
  const [openVivaId, setOpenVivaId] = useState<number | null>(1);

  return (
    <div className="space-y-8">
      {/* Navigation Sub-Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 flex flex-wrap gap-1.5 text-xs font-medium">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'architecture' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> 1 & 2. Structure & Architecture
        </button>
        <button
          onClick={() => setActiveTab('spring')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'spring' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" /> 3 & 4. Spring Boot & Auto-Config
        </button>
        <button
          onClick={() => setActiveTab('threelayer')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'threelayer' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> 5 & 6. Three-Tier & Domain
        </button>
        <button
          onClick={() => setActiveTab('logic')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'logic' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" /> 7 & 8. Logic & Presentation
        </button>
        <button
          onClick={() => setActiveTab('testing')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'testing' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5" /> 9. Testing Basics
        </button>
        <button
          onClick={() => setActiveTab('mapping')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'mapping' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Globe className="w-3.5 h-3.5" /> 10. Topic Mapping
        </button>
        <button
          onClick={() => setActiveTab('viva')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'viva' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" /> 11. 10 Viva Q&A
        </button>
      </div>

      {/* SECTION 1 & 2: Folder Structure & Architecture Diagram */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          {/* Folder Structure */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <FolderTree className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">1. Standard Maven & Spring Boot Folder Structure</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              A standard Maven project follows convention-over-configuration. Source code lives under <code>src/main/java</code>, static presentation assets under <code>src/main/resources/static</code>, and unit tests under <code>src/test/java</code>.
            </p>

            <pre className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
{`simple-inventory-manager/
├── pom.xml                                   # Maven dependencies & plugins (Starter Web, Starter Test)
├── README.md                                 # Execution instructions
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/inventory/
    │   │       ├── SimpleInventoryApplication.java  # Entry point (@SpringBootApplication)
    │   │       ├── controller/
    │   │       │   └── ProductController.java       # Presentation Layer (@RestController, @RequestMapping)
    │   │       ├── service/
    │   │       │   └── ProductService.java          # Business Logic Layer (@Service, in-memory ArrayList)
    │   │       └── model/
    │   │           └── Product.java                 # Domain Layer (POJO Model)
    │   └── resources/
    │       ├── application.properties               # Config (server.port=8080)
    │       └── static/                              # Presentation Layer Static Assets
    │           ├── index.html                       # Frontend Form and Inventory Table
    │           ├── style.css                        # UI Stylesheet
    │           └── app.js                           # JavaScript Fetch API Client
    └── test/
        └── java/
            └── com/inventory/
                └── ProductServiceTest.java          # Unit Testing Basics (JUnit 5)`}
            </pre>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">2. Three-Tier Architecture Diagram</h2>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              In Unit IV Full Stack Web Development, the system is partitioned into three distinct tiers to guarantee high cohesion and loose coupling:
            </p>

            {/* Visual Three-Tier Flow */}
            <div className="space-y-4 max-w-3xl mx-auto">
              {/* Tier 1: Presentation Layer */}
              <div className="p-5 rounded-xl border-2 border-blue-500 bg-blue-50/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                      1
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900">Presentation Layer (REST Controller & Web UI)</h3>
                      <p className="text-xs text-slate-600">Client UI (HTML/CSS/JS) + <code>ProductController.java</code></p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 bg-blue-100 text-blue-800 rounded font-semibold">
                    @RestController
                  </span>
                </div>
                <div className="mt-3 text-xs text-slate-700 space-y-1 bg-white p-3 rounded-lg border border-blue-200">
                  <p>• Accepts HTTP Requests (<code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code> /api/products)</p>
                  <p>• Serializes & deserializes JSON via Jackson</p>
                  <p>• Delegates all business operations to the injected <code>ProductService</code></p>
                  <p>• Translates service results and exceptions into HTTP Status Codes (<code>200 OK</code>, <code>201 CREATED</code>, <code>400 BAD REQUEST</code>)</p>
                </div>
              </div>

              {/* Connecting arrow */}
              <div className="flex justify-center text-slate-400">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Dependency Injection (@Autowired)
                  </span>
                  <span className="text-lg">↓</span>
                </div>
              </div>

              {/* Tier 2: Business Logic / Service Layer */}
              <div className="p-5 rounded-xl border-2 border-amber-500 bg-amber-50/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
                      2
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900">Business Logic Layer (Service)</h3>
                      <p className="text-xs text-slate-600"><code>ProductService.java</code></p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 bg-amber-100 text-amber-800 rounded font-semibold">
                    @Service
                  </span>
                </div>
                <div className="mt-3 text-xs text-slate-700 space-y-1 bg-white p-3 rounded-lg border border-amber-200">
                  <p>• Enforces business invariants and validation rules:</p>
                  <p className="pl-4 font-mono text-[11px] text-amber-900">• Quantity cannot be negative (&ge; 0)</p>
                  <p className="pl-4 font-mono text-[11px] text-amber-900">• Price cannot be negative (&ge; 0.0)</p>
                  <p className="pl-4 font-mono text-[11px] text-amber-900">• Name cannot be null or empty</p>
                  <p>• Manages in-memory storage list (<code>ArrayList&lt;Product&gt;</code>) without external DB overhead</p>
                </div>
              </div>

              {/* Connecting arrow */}
              <div className="flex justify-center text-slate-400">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Domain Manipulation
                  </span>
                  <span className="text-lg">↓</span>
                </div>
              </div>

              {/* Tier 3: Domain Layer */}
              <div className="p-5 rounded-xl border-2 border-emerald-500 bg-emerald-50/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                      3
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900">Domain Layer (Data Model)</h3>
                      <p className="text-xs text-slate-600"><code>Product.java</code></p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 bg-emerald-100 text-emerald-800 rounded font-semibold">
                    Plain Java POJO
                  </span>
                </div>
                <div className="mt-3 text-xs text-slate-700 space-y-1 bg-white p-3 rounded-lg border border-emerald-200">
                  <p>• Encapsulates inventory entity attributes: <code>id</code>, <code>name</code>, <code>category</code>, <code>quantity</code>, <code>price</code></p>
                  <p>• Contains standard getters, setters, default and parameterized constructors</p>
                  <p>• Zero dependency on persistence frameworks (No JPA / Hibernate)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3 & 4: Explanation of Spring Boot & Auto-Configuration */}
      {activeTab === 'spring' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Explanation of Spring Boot</h2>
            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                <strong>Spring Framework</strong> was introduced to address the complexity of enterprise Java (J2EE). However, configuring traditional Spring required massive amounts of boilerplate XML files, manual servlet mapping, and complex war deployment onto external application servers.
              </p>
              <p>
                <strong>Spring Boot</strong> is an opinionated framework built on top of Spring that enables developers to build production-grade stand-alone applications that you can "just run".
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Starter Dependencies</h4>
                  <p className="text-xs text-slate-600">
                    Pre-packaged dependency descriptors (e.g. <code>spring-boot-starter-web</code>) that bundle all required libraries with tested, compatible versions.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Embedded Web Server</h4>
                  <p className="text-xs text-slate-600">
                    Bundles Tomcat directly inside the JAR, eliminating the need to install or configure external Tomcat/Jetty servers.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Zero XML Boilerplate</h4>
                  <p className="text-xs text-slate-600">
                    Eliminates XML configurations entirely in favor of smart defaults, Java annotations, and <code>application.properties</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Explanation of Spring Boot Auto-Configuration</h2>
            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                <strong>Auto-configuration</strong> is Spring Boot's hallmark feature. It automatically configures Spring beans based on the JAR libraries detected on the application's classpath.
              </p>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h3 className="font-semibold text-indigo-950 text-sm mb-1">
                  How @SpringBootApplication Powers Auto-Configuration
                </h3>
                <p className="text-xs text-indigo-900 mb-2">
                  The main class <code>SimpleInventoryApplication</code> is annotated with <code>@SpringBootApplication</code>, which combines three core annotations:
                </p>
                <ul className="text-xs text-indigo-900 space-y-1 pl-4 list-disc">
                  <li>
                    <code>@Configuration</code>: Flags the class as a configuration source for beans.
                  </li>
                  <li>
                    <code>@EnableAutoConfiguration</code>: Activates Spring Boot's auto-configuration engine.
                  </li>
                  <li>
                    <code>@ComponentScan</code>: Instructs Spring to search for <code>@Component</code>, <code>@Service</code>, <code>@RestController</code> within the <code>com.inventory</code> package hierarchy.
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold text-slate-900 text-sm pt-2">What Spring Boot Auto-Configured in this Project:</h4>
              <ul className="text-xs text-slate-700 space-y-2 pl-4 list-disc">
                <li>
                  <strong>Embedded Tomcat:</strong> Because <code>spring-boot-starter-web</code> is in <code>pom.xml</code>, Spring Boot auto-starts Tomcat listening on port 8080.
                </li>
                <li>
                  <strong>DispatcherServlet:</strong> Auto-registers the central Front Controller that dispatches incoming HTTP requests to our <code>ProductController</code>.
                </li>
                <li>
                  <strong>Jackson ObjectMapper:</strong> Automatically converts incoming JSON payloads into Java <code>Product</code> objects, and converts returned Java objects into JSON.
                </li>
                <li>
                  <strong>Static Web Resources:</strong> Auto-serves files in <code>src/main/resources/static/</code> (like <code>index.html</code>, <code>style.css</code>, and <code>app.js</code>) as the presentation frontend without writing a single line of servlet code.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5 & 6: Three-Layer Architecture & Domain Model */}
      {activeTab === 'threelayer' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">5. Explanation of Three-Layer Architecture</h2>
            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                The Three-Layer (or Three-Tier) Architecture is an architectural pattern that promotes the <strong>Separation of Concerns (SoC)</strong> principle. Each layer has a distinct, isolated responsibility:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <span className="text-xs font-bold text-blue-600 uppercase">Layer 1</span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Presentation Layer</h3>
                  <p className="text-xs text-slate-600 mt-2">
                    Responsible for user interaction and communication protocol (HTTP/REST). It receives requests, deserializes inputs, calls the service layer, and prepares responses with proper HTTP status codes.
                  </p>
                  <p className="text-xs font-mono text-slate-800 mt-3 bg-white p-1.5 rounded border border-slate-200">
                    ProductController.java
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <span className="text-xs font-bold text-amber-600 uppercase">Layer 2</span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Business Logic Layer</h3>
                  <p className="text-xs text-slate-600 mt-2">
                    The brain of the system. Implements business rules, validation, calculations, and data processing. It operates independently of the transport protocol (it does not know or care about HTTP).
                  </p>
                  <p className="text-xs font-mono text-slate-800 mt-3 bg-white p-1.5 rounded border border-slate-200">
                    ProductService.java
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <span className="text-xs font-bold text-emerald-600 uppercase">Layer 3</span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Domain / Data Layer</h3>
                  <p className="text-xs text-slate-600 mt-2">
                    Represents the business entities and domain concepts. In Unit IV, persistence is demonstrated using in-memory data structures (<code>ArrayList</code>) to avoid database/JPA complexity.
                  </p>
                  <p className="text-xs font-mono text-slate-800 mt-3 bg-white p-1.5 rounded border border-slate-200">
                    Product.java + ArrayList
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">6. Explanation of Domain Model</h2>
            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                A <strong>Domain Model</strong> is an object-oriented representation of a business entity. In this tutorial, <code>Product.java</code> represents an inventory item with five core fields:
              </p>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Field</th>
                      <th className="p-2.5">Data Type</th>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5">Constraint</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr>
                      <td className="p-2.5 font-bold text-blue-600">id</td>
                      <td className="p-2.5">Long</td>
                      <td className="p-2.5 font-sans">Unique identifier of the product</td>
                      <td className="p-2.5 font-sans">Auto-generated via AtomicLong</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-blue-600">name</td>
                      <td className="p-2.5">String</td>
                      <td className="p-2.5 font-sans">Name of the item</td>
                      <td className="p-2.5 font-sans">Cannot be null or empty</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-blue-600">category</td>
                      <td className="p-2.5">String</td>
                      <td className="p-2.5 font-sans">Item classification</td>
                      <td className="p-2.5 font-sans">Optional / Default 'General'</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-blue-600">quantity</td>
                      <td className="p-2.5">int</td>
                      <td className="p-2.5 font-sans">Available stock count</td>
                      <td className="p-2.5 font-sans">Must be &ge; 0</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-blue-600">price</td>
                      <td className="p-2.5">double</td>
                      <td className="p-2.5 font-sans">Price per unit</td>
                      <td className="p-2.5 font-sans">Must be &ge; 0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-600">
                Notice that <code>Product.java</code> has no database annotations (no <code>@Entity</code>, no <code>@Table</code>, no <code>@Id</code> from JPA), keeping it strictly aligned with Unit IV's domain modeling scope.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7 & 8: Business Logic & Presentation Layer */}
      {activeTab === 'logic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">7. Explanation of Business Logic</h2>
            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                Business logic represents the rules, requirements, and domain policies that govern how data is created, transformed, and maintained. In this project, business logic is strictly encapsulated inside <code>ProductService.java</code>.
              </p>

              <h4 className="font-semibold text-slate-900 text-sm">Three Required Business Rules:</h4>
              <div className="space-y-2">
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs">
                  <p className="font-bold text-rose-900">Rule 1: Quantity cannot be negative</p>
                  <p className="text-rose-800 font-mono mt-1">if (product.getQuantity() &lt; 0) throw new IllegalArgumentException("Product quantity cannot be negative");</p>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs">
                  <p className="font-bold text-rose-900">Rule 2: Price cannot be negative</p>
                  <p className="text-rose-800 font-mono mt-1">if (product.getPrice() &lt; 0.0) throw new IllegalArgumentException("Product price cannot be negative");</p>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs">
                  <p className="font-bold text-rose-900">Rule 3: Product name cannot be empty</p>
                  <p className="text-rose-800 font-mono mt-1">if (product.getName() == null || product.getName().trim().isEmpty()) throw new IllegalArgumentException("Product name cannot be empty");</p>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Separating validation into the service layer prevents invalid data from entering the in-memory inventory and ensures that any client (web, mobile, or unit test) is subject to identical rules.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">8. Explanation of Presentation Layer</h2>
            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                The Presentation Layer consists of two complementary components:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Backend REST Controller</h4>
                  <p className="text-xs text-slate-600 mb-2">
                    <code>ProductController.java</code> annotated with <code>@RestController</code> and <code>@RequestMapping("/api/products")</code>.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1 font-mono">
                    <li>• @GetMapping ➔ getAllProducts()</li>
                    <li>• @GetMapping("/&#123;id&#125;") ➔ getProductById()</li>
                    <li>• @PostMapping ➔ addProduct()</li>
                    <li>• @PutMapping("/&#123;id&#125;") ➔ updateProduct()</li>
                    <li>• @DeleteMapping("/&#123;id&#125;") ➔ deleteProduct()</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Frontend HTML / CSS / JS Client</h4>
                  <p className="text-xs text-slate-600 mb-2">
                    Static web pages placed in <code>src/main/resources/static/</code>.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1 text-xs">
                    <li>• <strong>index.html:</strong> Semantic form for adding/editing products and a table listing all products.</li>
                    <li>• <strong>style.css:</strong> Clean styles, buttons, and alert states.</li>
                    <li>• <strong>app.js:</strong> Uses JavaScript <code>fetch()</code> API to trigger HTTP requests to the controller.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: Explanation of Testing */}
      {activeTab === 'testing' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">9. Explanation of Testing Basics (Unit IV)</h2>
          <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
            <p>
              In software engineering, <strong>Unit Testing</strong> verifies that individual classes and methods behave according to specifications under expected and unexpected inputs.
            </p>
            <p>
              Unit IV emphasizes testing business logic in isolation. Because <code>ProductService</code> has zero dependencies on databases or web servers, it can be tested as a pure Java class using <strong>JUnit 5 (Jupiter)</strong>.
            </p>

            <h4 className="font-semibold text-slate-900 text-sm pt-2">Key JUnit 5 Annotations and Assertions Used:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <code className="text-blue-600 font-bold">@Test</code>
                <p className="text-slate-600 mt-1">Marks a method as a test method to be executed by the JUnit test runner.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <code className="text-blue-600 font-bold">@BeforeEach</code>
                <p className="text-slate-600 mt-1">Runs before each test method to re-instantiate <code>ProductService</code>, providing a clean state.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <code className="text-blue-600 font-bold">assertEquals(expected, actual)</code>
                <p className="text-slate-600 mt-1">Asserts that two values are equal (e.g. product name or price).</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <code className="text-blue-600 font-bold">assertThrows(Class, Executable)</code>
                <p className="text-slate-600 mt-1">Asserts that execution of a lambda expression throws the expected exception type when invalid inputs are provided.</p>
              </div>
            </div>

            <h4 className="font-semibold text-slate-900 text-sm pt-2">The Three Core Unit Tests:</h4>
            <ol className="text-xs text-slate-700 list-decimal pl-5 space-y-1.5">
              <li>
                <strong>Adding product:</strong> Confirms that a product with valid fields receives an ID, is stored, and has identical field values.
              </li>
              <li>
                <strong>Invalid quantity:</strong> Confirms that passing a negative quantity throws <code>IllegalArgumentException</code> with the exact message <code>"Product quantity cannot be negative"</code>.
              </li>
              <li>
                <strong>Invalid price:</strong> Confirms that passing a negative price throws <code>IllegalArgumentException</code> with the exact message <code>"Product price cannot be negative"</code>.
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* SECTION 10: Unit-IV Topic Mapping */}
      {activeTab === 'mapping' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">10. Unit-IV Curriculum Topic Mapping</h2>
          <p className="text-sm text-slate-600 mb-4">
            Cross-referencing each syllabus topic in Unit IV with its concrete implementation in this tutorial project:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-1/4">Unit IV Syllabus Topic</th>
                  <th className="p-3 w-1/3">Theoretical Concept</th>
                  <th className="p-3">Project Demonstration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {UNIT_IV_TOPIC_MAPPINGS.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="p-3 font-semibold text-slate-900">{m.topic}</td>
                    <td className="p-3 text-slate-600">{m.concepts}</td>
                    <td className="p-3 font-mono text-slate-800 bg-slate-50/50">{m.projectImplementation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 11: 10 Viva Questions with Answers */}
      {activeTab === 'viva' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">11. 10 Comprehensive Viva Questions & Answers</h2>
              </div>
              <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                Unit IV Exam Prep
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Frequently asked viva and technical interview questions based strictly on Unit IV topics. Click any question to reveal or hide its detailed answer.
            </p>
          </div>

          <div className="space-y-3">
            {VIVA_QUESTIONS.map((q) => {
              const isOpen = openVivaId === q.id;
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenVivaId(isOpen ? null : q.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                        Q{q.id}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">{q.question}</h3>
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                          Topic: {q.unitTopic}
                        </span>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-xs text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <p className="font-semibold text-slate-900 mb-1">Answer:</p>
                      <p className="text-slate-700">{q.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
