import { useState } from 'react';
import { HiMenu, HiX, HiChevronRight, HiCode, HiServer, HiDatabase, HiChip, HiLightningBolt, HiDocumentText } from 'react-icons/hi';
import { Highlight, themes } from 'prism-react-renderer';

type Section = 'overview' | 'architecture' | 'setup' | 'code' | 'api' | 'run';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-700 my-4">
      {filename && (
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <span className="text-sm text-gray-300 font-mono">{filename}</span>
          <button
            onClick={handleCopy}
            className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded transition-colors"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 overflow-x-auto text-sm leading-relaxed`} style={{ ...style, margin: 0 }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-8 text-right mr-4 text-gray-500 select-none">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCodeFile, setActiveCodeFile] = useState('pom');

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <HiDocumentText /> },
    { id: 'architecture', label: 'Architecture', icon: <HiChip /> },
    { id: 'setup', label: 'Project Setup', icon: <HiServer /> },
    { id: 'code', label: 'Source Code', icon: <HiCode /> },
    { id: 'api', label: 'API Reference', icon: <HiLightningBolt /> },
    { id: 'run', label: 'Run & Test', icon: <HiDatabase /> },
  ];

  const codeFiles: { id: string; label: string; filename: string }[] = [
    { id: 'pom', label: 'pom.xml', filename: 'pom.xml' },
    { id: 'properties', label: 'application.properties', filename: 'src/main/resources/application.properties' },
    { id: 'main', label: 'Main Application', filename: 'FoodDeliveryApplication.java' },
    { id: 'menu-entity', label: 'Menu Entities', filename: 'menu/entity/MenuItem.java' },
    { id: 'menu-repo', label: 'Menu Repositories', filename: 'menu/repository/MenuItemRepository.java' },
    { id: 'menu-service', label: 'Menu Service', filename: 'menu/service/MenuService.java' },
    { id: 'menu-ctrl', label: 'Menu Controller', filename: 'menu/controller/MenuController.java' },
    { id: 'order-entity', label: 'Order Entities', filename: 'order/entity/Order.java' },
    { id: 'order-service', label: 'Order Service', filename: 'order/service/OrderService.java' },
    { id: 'order-ctrl', label: 'Order Controller', filename: 'order/controller/OrderController.java' },
    { id: 'delivery-entity', label: 'Delivery Entity', filename: 'delivery/entity/Delivery.java' },
    { id: 'delivery-service', label: 'Delivery Service', filename: 'delivery/service/DeliveryService.java' },
    { id: 'delivery-ctrl', label: 'Delivery Controller', filename: 'delivery/controller/DeliveryController.java' },
    { id: 'exception', label: 'Exception Handler', filename: 'common/exception/GlobalExceptionHandler.java' },
    { id: 'seeder', label: 'Data Seeder', filename: 'config/DataSeeder.java' },
    { id: 'swagger', label: 'Swagger Config', filename: 'config/SwaggerConfig.java' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-gray-800 border-r border-gray-700 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🍕</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Food Delivery</h1>
              <p className="text-xs text-gray-400">Modular Monolith</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeSection === item.id
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
              {activeSection === item.id && <HiChevronRight className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="bg-gray-700/50 rounded-lg p-3">
            <p className="text-xs text-gray-400">Tech Stack</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {['Java 21', 'Spring Boot 3.3', 'H2', 'JPA'].map((tech) => (
                <span key={tech} className="text-xs bg-gray-600 text-gray-300 px-2 py-0.5 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
            <HiMenu className="text-2xl" />
          </button>
          <h2 className="text-xl font-bold text-white">
            {navItems.find(n => n.id === activeSection)?.label}
          </h2>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
              ● Production Ready
            </span>
          </div>
        </header>

        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
          {/* OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  🍕 Food Delivery Modular Monolith
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  A high-performance, single-port Spring Boot application consolidating three previously separate 
                  microservices (Menu, Order, Delivery) into a modular monolith architecture. Built with Java 21 
                  and Spring Boot 3.3+, featuring clear package-based domain boundaries, in-memory H2 database, 
                  and comprehensive REST APIs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Menu Domain', desc: 'Manages menus, items, and categories', icon: '📋', color: 'blue' },
                  { title: 'Order Domain', desc: 'Handles cart, orders, and status tracking', icon: '🛒', color: 'green' },
                  { title: 'Delivery Domain', desc: 'Driver assignment and delivery tracking', icon: '🚗', color: 'purple' },
                ].map((domain) => (
                  <div key={domain.title} className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-gray-600 transition-colors">
                    <span className="text-3xl">{domain.icon}</span>
                    <h4 className="text-lg font-semibold text-white mt-3">{domain.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{domain.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">✨ Key Features</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Package-based modular boundaries',
                    'Direct in-memory service injection (no HTTP)',
                    'Global exception handling with @ControllerAdvice',
                    'Database seeder for instant testing',
                    'Spring Boot Actuator health checks',
                    'Interactive Swagger UI documentation',
                    'Bean validation with custom error messages',
                    'Status transition validation (state machines)',
                    'H2 in-memory database (zero config)',
                    'Lombok for boilerplate reduction',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-green-400">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">📁 Project Structure</h4>
                <CodeBlock code={projectStructureCode} language="bash" filename="Project Structure" />
              </div>
            </div>
          )}

          {/* ARCHITECTURE */}
          {activeSection === 'architecture' && (
            <div className="space-y-8">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🏗️ Modular Monolith Architecture</h3>
                <p className="text-gray-300 mb-6">
                  Unlike a traditional monolith, this architecture maintains strict domain boundaries through 
                  package segregation. Each module is self-contained with its own entities, repositories, services, 
                  and controllers. Cross-module communication happens through direct Java service injection — 
                  never through HTTP calls.
                </p>

                {/* Architecture Diagram */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-600">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-lg px-6 py-3">
                      <span className="text-orange-400 font-bold">Spring Boot 3.3+ Application (Port 8080)</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">📋</div>
                      <h5 className="text-blue-400 font-bold">Menu Module</h5>
                      <div className="text-xs text-gray-400 mt-2 space-y-1">
                        <p>com.fooddelivery.menu</p>
                        <p className="text-gray-500">├─ controller/</p>
                        <p className="text-gray-500">├─ service/</p>
                        <p className="text-gray-500">├─ repository/</p>
                        <p className="text-gray-500">├─ entity/</p>
                        <p className="text-gray-500">└─ dto/</p>
                      </div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🛒</div>
                      <h5 className="text-green-400 font-bold">Order Module</h5>
                      <div className="text-xs text-gray-400 mt-2 space-y-1">
                        <p>com.fooddelivery.order</p>
                        <p className="text-gray-500">├─ controller/</p>
                        <p className="text-gray-500">├─ service/</p>
                        <p className="text-gray-500">├─ repository/</p>
                        <p className="text-gray-500">├─ entity/</p>
                        <p className="text-gray-500">└─ dto/</p>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🚗</div>
                      <h5 className="text-purple-400 font-bold">Delivery Module</h5>
                      <div className="text-xs text-gray-400 mt-2 space-y-1">
                        <p>com.fooddelivery.delivery</p>
                        <p className="text-gray-500">├─ controller/</p>
                        <p className="text-gray-500">├─ service/</p>
                        <p className="text-gray-500">├─ repository/</p>
                        <p className="text-gray-500">├─ entity/</p>
                        <p className="text-gray-500">└─ dto/</p>
                      </div>
                    </div>
                  </div>

                  {/* Cross-module arrows */}
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                    <h6 className="text-sm font-bold text-yellow-400 mb-3">⚡ Cross-Module Communication (Direct Injection)</h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <span className="text-green-400">OrderService</span>
                        <span className="text-gray-500">→ injects →</span>
                        <span className="text-blue-400">MenuService</span>
                        <span className="text-gray-500">(validates item existence)</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <span className="text-purple-400">DeliveryService</span>
                        <span className="text-gray-500">→ injects →</span>
                        <span className="text-green-400">OrderService</span>
                        <span className="text-gray-500">(validates order, updates status)</span>
                      </div>
                    </div>
                  </div>

                  {/* Infrastructure */}
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600 text-center">
                      <span className="text-xl">🗄️</span>
                      <p className="text-sm text-gray-300 mt-2">H2 In-Memory Database</p>
                      <p className="text-xs text-gray-500">Spring Data JPA</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600 text-center">
                      <span className="text-xl">📊</span>
                      <p className="text-sm text-gray-300 mt-2">Actuator + Swagger UI</p>
                      <p className="text-xs text-gray-500">Health / Metrics / Docs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">🔄 Data Flow Example: Creating an Order</h4>
                <div className="space-y-3">
                  {[
                    { step: 1, desc: 'Client sends POST /api/v1/orders with item IDs', color: 'orange' },
                    { step: 2, desc: 'OrderController delegates to OrderService', color: 'orange' },
                    { step: 3, desc: 'OrderService calls MenuService.getItemsByIds() — validates items exist', color: 'blue' },
                    { step: 4, desc: 'OrderService calculates total, creates Order + OrderItems', color: 'green' },
                    { step: 5, desc: 'OrderRepository saves to H2 database', color: 'green' },
                    { step: 6, desc: 'Response returned to client with full order details', color: 'orange' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-${item.color}-500/20 text-${item.color}-400 border border-${item.color}-500/30`}>
                        {item.step}
                      </span>
                      <span className="text-sm text-gray-300">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">📊 Status State Machines</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-bold text-green-400 mb-3">Order Status Flow:</h5>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-1">
                      <p>PENDING → CONFIRMED → DELIVERING → COMPLETED</p>
                      <p>PENDING → CANCELLED</p>
                      <p>CONFIRMED → CANCELLED</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-purple-400 mb-3">Delivery Status Flow:</h5>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-1">
                      <p>ASSIGNED → PICKED_UP → DELIVERED</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETUP */}
          {activeSection === 'setup' && (
            <div className="space-y-8">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">⚙️ Prerequisites & Setup</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-semibold text-orange-400 mb-2">1. Install JDK 21</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 space-y-2">
                      <p className="text-gray-400"># Using SDKMAN (recommended):</p>
                      <p>curl -s "https://get.sdkman.io" | bash</p>
                      <p>sdk install java 21-open</p>
                      <p>sdk use java 21-open</p>
                      <p className="mt-3 text-gray-400"># Or download from:</p>
                      <p>https://adoptium.net/temurin/releases/ (JDK 21)</p>
                      <p className="mt-3 text-gray-400"># Verify installation:</p>
                      <p>java --version</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-orange-400 mb-2">2. Install Apache Maven 3.9+</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 space-y-2">
                      <p className="text-gray-400"># Using SDKMAN:</p>
                      <p>sdk install maven</p>
                      <p className="mt-3 text-gray-400"># Or using Homebrew (macOS):</p>
                      <p>brew install maven</p>
                      <p className="mt-3 text-gray-400"># Or using apt (Ubuntu/Debian):</p>
                      <p>sudo apt install maven</p>
                      <p className="mt-3 text-gray-400"># Verify:</p>
                      <p>mvn --version</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-orange-400 mb-2">3. IDE Setup (Optional but Recommended)</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 space-y-2">
                      <p className="text-gray-400"># Recommended: IntelliJ IDEA 2024.1+ (Community Edition is free)</p>
                      <p className="text-gray-400"># Download: https://www.jetbrains.com/idea/download/</p>
                      <p className="mt-3 text-gray-400"># Ensure these plugins are installed:</p>
                      <p>• Lombok Plugin (built-in since 2020.3)</p>
                      <p>• Enable annotation processing in Settings → Build → Compiler → Annotations</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-orange-400 mb-2">4. Create Project Directory</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 space-y-2">
                      <p>mkdir food-delivery-modular-monolith</p>
                      <p>cd food-delivery-modular-monolith</p>
                      <p>mkdir -p src/main/java/com/fooddelivery</p>
                      <p>mkdir -p src/main/resources</p>
                      <p>mkdir -p src/test/java/com/fooddelivery</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">📦 pom.xml — Complete Dependencies</h4>
                <CodeBlock code={pomXmlCode} language="xml" filename="pom.xml" />
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">⚙️ application.properties</h4>
                <CodeBlock code={applicationPropertiesCode} language="properties" filename="src/main/resources/application.properties" />
              </div>
            </div>
          )}

          {/* CODE */}
          {activeSection === 'code' && (
            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">💻 Source Code</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Select a file from the list below to view its complete source code. All imports are explicit 
                  and the code compiles without missing symbols.
                </p>

                {/* File selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {codeFiles.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setActiveCodeFile(file.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                        activeCodeFile === file.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {file.label}
                    </button>
                  ))}
                </div>

                {/* Code display */}
                {activeCodeFile === 'pom' && <CodeBlock code={pomXmlCode} language="xml" filename="pom.xml" />}
                {activeCodeFile === 'properties' && <CodeBlock code={applicationPropertiesCode} language="properties" filename="application.properties" />}
                {activeCodeFile === 'main' && <CodeBlock code={mainAppCode} language="java" filename="FoodDeliveryApplication.java" />}
                {activeCodeFile === 'menu-entity' && <CodeBlock code={menuItemEntityCode} language="java" filename="menu/entity/MenuItem.java" />}
                {activeCodeFile === 'menu-repo' && <CodeBlock code={menuItemRepoCode} language="java" filename="menu/repository/MenuItemRepository.java" />}
                {activeCodeFile === 'menu-service' && <CodeBlock code={menuServiceCode} language="java" filename="menu/service/MenuService.java" />}
                {activeCodeFile === 'menu-ctrl' && <CodeBlock code={menuControllerCode} language="java" filename="menu/controller/MenuController.java" />}
                {activeCodeFile === 'order-entity' && <CodeBlock code={orderEntityCode} language="java" filename="order/entity/Order.java" />}
                {activeCodeFile === 'order-service' && <CodeBlock code={orderServiceCode} language="java" filename="order/service/OrderService.java" />}
                {activeCodeFile === 'order-ctrl' && <CodeBlock code={orderControllerCode} language="java" filename="order/controller/OrderController.java" />}
                {activeCodeFile === 'delivery-entity' && <CodeBlock code={deliveryEntityCode} language="java" filename="delivery/entity/Delivery.java" />}
                {activeCodeFile === 'delivery-service' && <CodeBlock code={deliveryServiceCode} language="java" filename="delivery/service/DeliveryService.java" />}
                {activeCodeFile === 'delivery-ctrl' && <CodeBlock code={deliveryControllerCode} language="java" filename="delivery/controller/DeliveryController.java" />}
                {activeCodeFile === 'exception' && <CodeBlock code={exceptionHandlerCode} language="java" filename="common/exception/GlobalExceptionHandler.java" />}
                {activeCodeFile === 'seeder' && <CodeBlock code={dataSeederCode} language="java" filename="config/DataSeeder.java" />}
                {activeCodeFile === 'swagger' && <CodeBlock code={swaggerConfigCode} language="java" filename="config/SwaggerConfig.java" />}
              </div>
            </div>
          )}

          {/* API REFERENCE */}
          {activeSection === 'api' && (
            <div className="space-y-8">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">📡 API Endpoints Reference</h3>
                <p className="text-gray-400 text-sm mb-6">
                  All endpoints are prefixed with <code className="bg-gray-700 px-2 py-0.5 rounded text-orange-400">/api/v1</code>. 
                  Interactive documentation available at <code className="bg-gray-700 px-2 py-0.5 rounded text-green-400">http://localhost:8080/swagger-ui/index.html</code>
                </p>

                {/* Menu APIs */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <span>📋</span> Menu Domain APIs
                  </h4>
                  <div className="space-y-3">
                    <ApiEndpoint method="GET" path="/api/v1/menus" desc="Retrieve all menus and categories" />
                    <ApiEndpoint method="GET" path="/api/v1/items" desc="Retrieve all menu items (optional ?category= filter)" />
                    <ApiEndpoint method="POST" path="/api/v1/items" desc="Add a new menu item" body={`{
  "name": "New Pizza",
  "description": "Delicious pepperoni pizza",
  "price": 14.99,
  "category": "Main Course",
  "available": true
}`} />
                  </div>
                </div>

                {/* Order APIs */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <span>🛒</span> Order Domain APIs
                  </h4>
                  <div className="space-y-3">
                    <ApiEndpoint method="POST" path="/api/v1/orders" desc="Create a new order" body={`{
  "customerName": "Jane Smith",
  "customerPhone": "+1-555-0456",
  "deliveryAddress": "456 Oak Avenue, Brooklyn, NY 11201",
  "items": [
    { "menuItemId": 4, "quantity": 2 },
    { "menuItemId": 10, "quantity": 1 }
  ]
}`} />
                    <ApiEndpoint method="GET" path="/api/v1/orders/{id}" desc="Get order details by ID" />
                    <ApiEndpoint method="PUT" path="/api/v1/orders/{id}/status" desc="Update order status" body={`{
  "status": "CONFIRMED"
}

// Valid transitions:
// PENDING → CONFIRMED | CANCELLED
// CONFIRMED → DELIVERING | CANCELLED
// DELIVERING → COMPLETED`} />
                  </div>
                </div>

                {/* Delivery APIs */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <span>🚗</span> Delivery Domain APIs
                  </h4>
                  <div className="space-y-3">
                    <ApiEndpoint method="POST" path="/api/v1/deliveries" desc="Assign a driver to an order" body={`{
  "orderId": 1,
  "driverName": "Alex Rivera",
  "driverPhone": "+1-555-7890"
}`} />
                    <ApiEndpoint method="GET" path="/api/v1/deliveries/order/{orderId}" desc="Get delivery tracking for an order" />
                    <ApiEndpoint method="PUT" path="/api/v1/deliveries/{id}/status" desc="Update delivery status" body={`{
  "status": "PICKED_UP"
}

// Valid transitions:
// ASSIGNED → PICKED_UP
// PICKED_UP → DELIVERED`} />
                  </div>
                </div>

                {/* Actuator & Swagger */}
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                    <span>🔧</span> Infrastructure Endpoints
                  </h4>
                  <div className="space-y-3">
                    <ApiEndpoint method="GET" path="/actuator/health" desc="Health check endpoint" />
                    <ApiEndpoint method="GET" path="/actuator/metrics" desc="Application metrics" />
                    <ApiEndpoint method="GET" path="/swagger-ui/index.html" desc="Interactive Swagger UI" />
                    <ApiEndpoint method="GET" path="/h2-console" desc="H2 Database Console" />
                  </div>
                </div>
              </div>

              {/* Error Response Format */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">❌ Error Response Format</h4>
                <CodeBlock code={`{
  "timestamp": "2024-10-15T14:30:00",
  "status": 400,
  "message": "Menu item not found with id: 999"
}

// Validation errors include field-level details:
{
  "timestamp": "2024-10-15T14:30:00",
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "customerName": "Customer name is required",
    "deliveryAddress": "Delivery address is required"
  }
}`} language="json" filename="Error Response Examples" />
              </div>
            </div>
          )}

          {/* RUN & TEST */}
          {activeSection === 'run' && (
            <div className="space-y-8">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🚀 Build & Run Instructions</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-semibold text-green-400 mb-2">Step 1: Build the Project</h4>
                    <CodeBlock code={`# Navigate to project root
cd food-delivery-modular-monolith

# Build with Maven (skip tests for faster build)
mvn clean package -DskipTests

# Or build with tests
mvn clean package`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-green-400 mb-2">Step 2: Run the Application</h4>
                    <CodeBlock code={`# Option 1: Run with Maven
mvn spring-boot:run

# Option 2: Run the JAR directly
java -jar target/food-delivery-modular-monolith-1.0.0.jar

# Option 3: Run from IDE
# Right-click FoodDeliveryApplication.java → Run`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-green-400 mb-2">Step 3: Verify the Application is Running</h4>
                    <CodeBlock code={`# Health check
curl http://localhost:8080/actuator/health

# Expected response:
# {"status":"UP","components":{...}}

# Check menu items
curl http://localhost:8080/api/v1/items

# Check menus/categories
curl http://localhost:8080/api/v1/menus`} language="bash" filename="Terminal" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🧪 Testing the APIs</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-semibold text-blue-400 mb-2">Test 1: Get All Menu Items</h4>
                    <CodeBlock code={`curl -X GET http://localhost:8080/api/v1/items \\
  -H "Content-Type: application/json"

# Response: Array of MenuItem objects with pre-seeded data`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-blue-400 mb-2">Test 2: Create a New Order</h4>
                    <CodeBlock code={`curl -X POST http://localhost:8080/api/v1/orders \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerName": "Jane Smith",
    "customerPhone": "+1-555-0456",
    "deliveryAddress": "456 Oak Avenue, Brooklyn, NY 11201",
    "items": [
      {"menuItemId": 4, "quantity": 2},
      {"menuItemId": 10, "quantity": 1}
    ]
  }'

# Response: Order object with calculated total amount`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-blue-400 mb-2">Test 3: Get Order Details</h4>
                    <CodeBlock code={`curl -X GET http://localhost:8080/api/v1/orders/1 \\
  -H "Content-Type: application/json"

# Response: Full order with items, status, and total`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-blue-400 mb-2">Test 4: Update Order Status</h4>
                    <CodeBlock code={`curl -X PUT http://localhost:8080/api/v1/orders/1/status \\
  -H "Content-Type: application/json" \\
  -d '{"status": "CONFIRMED"}'

# Response: Updated order with new status`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-blue-400 mb-2">Test 5: Assign a Driver</h4>
                    <CodeBlock code={`curl -X POST http://localhost:8080/api/v1/deliveries \\
  -H "Content-Type: application/json" \\
  -d '{
    "orderId": 1,
    "driverName": "Alex Rivera",
    "driverPhone": "+1-555-7890"
  }'

# Response: Delivery object with ASSIGNED status`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-blue-400 mb-2">Test 6: Track Delivery</h4>
                    <CodeBlock code={`curl -X GET http://localhost:8080/api/v1/deliveries/order/1 \\
  -H "Content-Type: application/json"

# Response: Delivery details with driver info and status`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-blue-400 mb-2">Test 7: Update Delivery Status</h4>
                    <CodeBlock code={`# Mark as picked up
curl -X PUT http://localhost:8080/api/v1/deliveries/1/status \\
  -H "Content-Type: application/json" \\
  -d '{"status": "PICKED_UP"}'

# Mark as delivered (also updates order to COMPLETED)
curl -X PUT http://localhost:8080/api/v1/deliveries/1/status \\
  -H "Content-Type: application/json" \\
  -d '{"status": "DELIVERED"}'`} language="bash" filename="Terminal" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🌐 Access Points</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'REST API', url: 'http://localhost:8080/api/v1', desc: 'Base URL for all APIs' },
                    { name: 'Swagger UI', url: 'http://localhost:8080/swagger-ui/index.html', desc: 'Interactive API docs' },
                    { name: 'Health Check', url: 'http://localhost:8080/actuator/health', desc: 'Application health' },
                    { name: 'H2 Console', url: 'http://localhost:8080/h2-console', desc: 'Database browser (JDBC URL: jdbc:h2:mem:fooddelivery)' },
                  ].map((point) => (
                    <div key={point.name} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h5 className="text-sm font-bold text-white">{point.name}</h5>
                      <p className="text-xs text-orange-400 font-mono mt-1 break-all">{point.url}</p>
                      <p className="text-xs text-gray-500 mt-1">{point.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🐛 Troubleshooting</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h5 className="text-yellow-400 font-semibold">Port 8080 already in use?</h5>
                    <p className="text-gray-400 mt-1">Change server.port in application.properties or kill the existing process: <code className="bg-gray-700 px-1 rounded">lsof -i :8080</code></p>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold">Lombok not working in IDE?</h5>
                    <p className="text-gray-400 mt-1">Enable annotation processing: Settings → Build → Compiler → Annotations → Enable annotation processing</p>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold">H2 Console not accessible?</h5>
                    <p className="text-gray-400 mt-1">Use JDBC URL: <code className="bg-gray-700 px-1 rounded">jdbc:h2:mem:fooddelivery</code>, Username: <code className="bg-gray-700 px-1 rounded">sa</code>, Password: (leave empty)</p>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold">Maven build fails?</h5>
                    <p className="text-gray-400 mt-1">Ensure JAVA_HOME points to JDK 21: <code className="bg-gray-700 px-1 rounded">echo $JAVA_HOME</code>. Run <code className="bg-gray-700 px-1 rounded">mvn clean</code> first.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// API Endpoint component
function ApiEndpoint({ method, path, desc, body }: { method: string; path: string; desc: string; body?: string }) {
  const [expanded, setExpanded] = useState(false);
  
  const methodColors: Record<string, string> = {
    GET: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    POST: 'bg-green-500/20 text-green-400 border-green-500/30',
    PUT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <button
        onClick={() => body && setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 transition-colors text-left"
      >
        <span className={`text-xs font-bold px-2 py-1 rounded border ${methodColors[method]}`}>
          {method}
        </span>
        <code className="text-sm text-gray-200 font-mono">{path}</code>
        <span className="text-xs text-gray-500 ml-auto hidden sm:inline">{desc}</span>
        {body && <HiChevronRight className={`text-gray-500 transition-transform ${expanded ? 'rotate-90' : ''}`} />}
      </button>
      {expanded && body && (
        <div className="border-t border-gray-700 p-3">
          <p className="text-xs text-gray-400 mb-2">Request Body:</p>
          <pre className="text-xs text-gray-300 bg-gray-800 rounded p-3 overflow-x-auto font-mono whitespace-pre-wrap">{body}</pre>
        </div>
      )}
    </div>
  );
}

// Import code strings
import {
  pomXml as pomXmlCode,
  applicationProperties as applicationPropertiesCode,
  mainApplication as mainAppCode,
  menuItemEntity as menuItemEntityCode,
  menuItemRepository as menuItemRepoCode,
  menuService as menuServiceCode,
  menuController as menuControllerCode,
  orderEntity as orderEntityCode,
  orderService as orderServiceCode,
  orderController as orderControllerCode,
  deliveryEntity as deliveryEntityCode,
  deliveryService as deliveryServiceCode,
  deliveryController as deliveryControllerCode,
  globalExceptionHandler as exceptionHandlerCode,
  dataSeeder as dataSeederCode,
  swaggerConfig as swaggerConfigCode,
  projectStructure as projectStructureCode,
} from './data/javaCode';

export default App;
