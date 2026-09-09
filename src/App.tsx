import { useState } from 'react';
import { HiMenu, HiX, HiChevronRight, HiChevronDown, HiCode, HiServer, HiDatabase, HiChip, HiLightningBolt, HiDocumentText, HiFolder, HiDocument } from 'react-icons/hi';
import { Highlight, themes } from 'prism-react-renderer';

type Section = 'overview' | 'structure' | 'architecture' | 'setup' | 'code' | 'api' | 'run';

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
  const [activeSection, setActiveSection] = useState<Section>('structure');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCodeFile, setActiveCodeFile] = useState('pom');

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <HiDocumentText /> },
    { id: 'structure', label: 'Folder Structure', icon: <HiFolder /> },
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
    { id: 'shared-enums', label: 'Shared Enums', filename: 'shared/*.java' },
    { id: 'shared-exceptions', label: 'Exceptions', filename: 'shared/*Exception.java' },
    { id: 'shared-handler', label: 'Exception Handler', filename: 'shared/GlobalExceptionHandler.java' },
    { id: 'menu-entity', label: 'Menu Entities', filename: 'menu/entity/*.java' },
    { id: 'menu-repo', label: 'Menu Repositories', filename: 'menu/repository/*.java' },
    { id: 'menu-service', label: 'Menu Service', filename: 'menu/service/MenuService.java' },
    { id: 'menu-ctrl', label: 'Menu Controller', filename: 'menu/controller/MenuController.java' },
    { id: 'order-entity', label: 'Order Entities', filename: 'order/entity/*.java' },
    { id: 'order-repo', label: 'Order Repository', filename: 'order/repository/OrderRepository.java' },
    { id: 'order-service', label: 'Order Service', filename: 'order/service/OrderService.java' },
    { id: 'order-ctrl', label: 'Order Controller', filename: 'order/controller/OrderController.java' },
    { id: 'delivery-entity', label: 'Delivery Entity', filename: 'delivery/entity/Delivery.java' },
    { id: 'delivery-repo', label: 'Delivery Repository', filename: 'delivery/repository/DeliveryRepository.java' },
    { id: 'delivery-service', label: 'Delivery Service', filename: 'delivery/service/DeliveryService.java' },
    { id: 'delivery-ctrl', label: 'Delivery Controller', filename: 'delivery/controller/DeliveryController.java' },
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
              {['Java 25', 'Spring Boot 4.1', 'H2', 'JPA'].map((tech) => (
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
              ● All Files Included
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
                  A complete food delivery backend system built as a modular monolith using <strong className="text-orange-400">Java 25 (LTS)</strong>, <strong className="text-orange-400">Spring Boot 4.1.1</strong>, 
                  and H2 in-memory database. All source files are included in the <code className="bg-gray-700 px-2 py-0.5 rounded">food-delivery-backend/</code> directory.
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
                    'Java 25 LTS (September 2025)',
                    'Spring Boot 4.1.1 (latest stable)',
                    'Spring Framework 7.x',
                    'Jakarta EE 11 (Servlet 6.1)',
                    'Hibernate 7.x ORM',
                    'Jackson 3 (default JSON)',
                    'Springdoc OpenAPI 3.1.1',
                    'Modular test starters',
                    'Direct in-memory service injection',
                    'H2 in-memory database',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-green-400">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-green-400 mb-4">🆕 What's New: Java 25 + Spring Boot 4</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-white mb-2">Java 25 (LTS)</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Primitive types in pattern matching (JEP 507)</li>
                      <li>• Compact Object Headers for memory efficiency</li>
                      <li>• Generational ZGC improvements</li>
                      <li>• Structured Concurrency finalized</li>
                      <li>• Scoped Values finalized</li>
                      <li>• Module Import Declarations</li>
                      <li>• Long-Term Support until 2033+</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white mb-2">Spring Boot 4.1.1</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Modular starter design (smaller JARs)</li>
                      <li>• <code className="bg-gray-700 px-1 rounded">starter-web</code> → <code className="bg-gray-700 px-1 rounded">starter-webmvc</code></li>
                      <li>• Jackson 3 as default JSON library</li>
                      <li>• Jakarta EE 11 baseline</li>
                      <li>• JSpecify null-safety annotations</li>
                      <li>• Modular test starters</li>
                      <li>• Java 17-26 compatibility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FOLDER STRUCTURE */}
          {activeSection === 'structure' && (
            <div className="space-y-8">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">📁 Complete Project Structure</h3>
                <p className="text-gray-400 text-sm mb-6">
                  All files are located in the <code className="bg-gray-700 px-2 py-0.5 rounded text-orange-400">food-delivery-backend/</code> directory.
                </p>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-600 font-mono text-sm">
                  <div className="space-y-1 text-gray-300">
                    <div className="text-orange-400 font-bold">food-delivery-backend/</div>
                    <div className="ml-4">├── <span className="text-blue-400">pom.xml</span></div>
                    <div className="ml-4">├── <span className="text-blue-400">README.md</span></div>
                    <div className="ml-4">└── <span className="text-yellow-400">src/</span></div>
                    <div className="ml-8">└── <span className="text-yellow-400">main/</span></div>
                    <div className="ml-12">├── <span className="text-yellow-400">java/</span></div>
                    <div className="ml-16">└── <span className="text-yellow-400">com/fooddelivery/</span></div>
                    <div className="ml-20">├── <span className="text-green-400">FoodDeliveryApplication.java</span></div>
                    <div className="ml-20">├── <span className="text-yellow-400">shared/</span></div>
                    <div className="ml-24">├── <span className="text-green-400">OrderStatus.java</span></div>
                    <div className="ml-24">├── <span className="text-green-400">DeliveryStatus.java</span></div>
                    <div className="ml-24">├── <span className="text-green-400">MenuItemType.java</span></div>
                    <div className="ml-24">├── <span className="text-green-400">ResourceNotFoundException.java</span></div>
                    <div className="ml-24">├── <span className="text-green-400">ValidationException.java</span></div>
                    <div className="ml-24">└── <span className="text-green-400">GlobalExceptionHandler.java</span></div>
                    <div className="ml-20">├── <span className="text-yellow-400">menu/</span></div>
                    <div className="ml-24">├── <span className="text-yellow-400">entity/</span></div>
                    <div className="ml-28">├── <span className="text-green-400">MenuCategory.java</span></div>
                    <div className="ml-28">└── <span className="text-green-400">MenuItem.java</span></div>
                    <div className="ml-24">├── <span className="text-yellow-400">repository/</span></div>
                    <div className="ml-28">├── <span className="text-green-400">MenuCategoryRepository.java</span></div>
                    <div className="ml-28">└── <span className="text-green-400">MenuItemRepository.java</span></div>
                    <div className="ml-24">├── <span className="text-yellow-400">service/</span></div>
                    <div className="ml-28">└── <span className="text-green-400">MenuService.java</span></div>
                    <div className="ml-24">└── <span className="text-yellow-400">controller/</span></div>
                    <div className="ml-28">└── <span className="text-green-400">MenuController.java</span></div>
                    <div className="ml-20">├── <span className="text-yellow-400">order/</span></div>
                    <div className="ml-24">├── <span className="text-yellow-400">entity/</span></div>
                    <div className="ml-28">├── <span className="text-green-400">Order.java</span></div>
                    <div className="ml-28">└── <span className="text-green-400">OrderItem.java</span></div>
                    <div className="ml-24">├── <span className="text-yellow-400">repository/</span></div>
                    <div className="ml-28">└── <span className="text-green-400">OrderRepository.java</span></div>
                    <div className="ml-24">├── <span className="text-yellow-400">service/</span></div>
                    <div className="ml-28">└── <span className="text-green-400">OrderService.java</span></div>
                    <div className="ml-24">└── <span className="text-yellow-400">controller/</span></div>
                    <div className="ml-28">└── <span className="text-green-400">OrderController.java</span></div>
                    <div className="ml-20">├── <span className="text-yellow-400">delivery/</span></div>
                    <div className="ml-24">├── <span className="text-yellow-400">entity/</span></div>
                    <div className="ml-28">└── <span className="text-green-400">Delivery.java</span></div>
                    <div className="ml-24">├── <span className="text-yellow-400">repository/</span></div>
                    <div className="ml-28">└── <span className="text-green-400">DeliveryRepository.java</span></div>
                    <div className="ml-24">├── <span className="text-yellow-400">service/</span></div>
                    <div className="ml-28">└── <span className="text-green-400">DeliveryService.java</span></div>
                    <div className="ml-24">└── <span className="text-yellow-400">controller/</span></div>
                    <div className="ml-28">└── <span className="text-green-400">DeliveryController.java</span></div>
                    <div className="ml-20">└── <span className="text-yellow-400">config/</span></div>
                    <div className="ml-24">├── <span className="text-green-400">DataSeeder.java</span></div>
                    <div className="ml-24">└── <span className="text-green-400">SwaggerConfig.java</span></div>
                    <div className="ml-12">└── <span className="text-yellow-400">resources/</span></div>
                    <div className="ml-16">└── <span className="text-blue-400">application.properties</span></div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm text-blue-300">
                    <strong>Legend:</strong> <span className="text-yellow-400">Yellow</span> = directories, <span className="text-green-400">Green</span> = Java files, <span className="text-blue-400">Blue</span> = configuration files
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">📊 File Statistics</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-600 text-center">
                    <div className="text-3xl font-bold text-orange-400">22</div>
                    <div className="text-sm text-gray-400 mt-1">Java Files</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-600 text-center">
                    <div className="text-3xl font-bold text-blue-400">3</div>
                    <div className="text-sm text-gray-400 mt-1">Domains</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-600 text-center">
                    <div className="text-3xl font-bold text-green-400">10</div>
                    <div className="text-sm text-gray-400 mt-1">API Endpoints</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ARCHITECTURE */}
          {activeSection === 'architecture' && (
            <div className="space-y-8">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🏗️ Modular Monolith Architecture</h3>
                <p className="text-gray-300 mb-6">
                  The application maintains strict domain boundaries through package segregation. Each module is 
                  self-contained with its own entities, repositories, services, and controllers.
                </p>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-600">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-lg px-6 py-3">
                      <span className="text-orange-400 font-bold">Spring Boot 4.1.1 Application (Port 8080)</span>
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
                        <p className="text-gray-500">└─ entity/</p>
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
                        <p className="text-gray-500">└─ entity/</p>
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
                        <p className="text-gray-500">└─ entity/</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                    <h6 className="text-sm font-bold text-yellow-400 mb-3">⚡ Cross-Module Communication</h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <span className="text-green-400">OrderService</span>
                        <span className="text-gray-500">→</span>
                        <span className="text-blue-400">MenuService</span>
                        <span className="text-gray-500">(validates items)</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <span className="text-purple-400">DeliveryService</span>
                        <span className="text-gray-500">→</span>
                        <span className="text-green-400">OrderService</span>
                        <span className="text-gray-500">(updates status)</span>
                      </div>
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
                    <h4 className="text-md font-semibold text-orange-400 mb-2">1. Install JDK 25 (LTS)</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 space-y-2">
                      <p className="text-gray-400"># Ubuntu/Debian:</p>
                      <p>sudo apt update && sudo apt install openjdk-25-jdk</p>
                      <p className="mt-3 text-gray-400"># macOS (Homebrew):</p>
                      <p>brew install openjdk@25</p>
                      <p className="mt-3 text-gray-400"># SDKMAN (recommended):</p>
                      <p>sdk install java 25-open</p>
                      <p className="mt-3 text-gray-400"># Verify:</p>
                      <p>java -version  # Expected: openjdk version "25"</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-orange-400 mb-2">2. Install Maven 3.9+</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 space-y-2">
                      <p className="text-gray-400"># Ubuntu/Debian:</p>
                      <p>sudo apt install maven</p>
                      <p className="mt-3 text-gray-400"># macOS:</p>
                      <p>brew install maven</p>
                      <p className="mt-3 text-gray-400"># SDKMAN:</p>
                      <p>sdk install maven</p>
                      <p className="mt-3 text-gray-400"># Verify (need 3.9+):</p>
                      <p>mvn -version</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-orange-400 mb-2">3. Navigate to Project</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 space-y-2">
                      <p>cd food-delivery-backend</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">📦 pom.xml</h4>
                <CodeBlock code={pomXmlCode} language="xml" filename="pom.xml" />
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">⚙️ application.properties</h4>
                <CodeBlock code={applicationPropertiesCode} language="properties" filename="application.properties" />
              </div>
            </div>
          )}

          {/* CODE */}
          {activeSection === 'code' && (
            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">💻 Source Code</h3>
                <p className="text-gray-400 text-sm mb-6">
                  All Java source files are included. Select a file to view its complete code.
                </p>

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

                {activeCodeFile === 'pom' && <CodeBlock code={pomXmlCode} language="xml" filename="pom.xml" />}
                {activeCodeFile === 'properties' && <CodeBlock code={applicationPropertiesCode} language="properties" filename="application.properties" />}
                {activeCodeFile === 'main' && <CodeBlock code={mainAppCode} language="java" filename="FoodDeliveryApplication.java" />}
                {activeCodeFile === 'shared-enums' && <CodeBlock code={sharedEnumsCode} language="java" filename="shared/OrderStatus.java, DeliveryStatus.java, MenuItemType.java" />}
                {activeCodeFile === 'shared-exceptions' && <CodeBlock code={sharedExceptionsCode} language="java" filename="shared/ResourceNotFoundException.java, ValidationException.java" />}
                {activeCodeFile === 'shared-handler' && <CodeBlock code={exceptionHandlerCode} language="java" filename="shared/GlobalExceptionHandler.java" />}
                {activeCodeFile === 'menu-entity' && <CodeBlock code={menuEntityCode} language="java" filename="menu/entity/MenuCategory.java, MenuItem.java" />}
                {activeCodeFile === 'menu-repo' && <CodeBlock code={menuRepoCode} language="java" filename="menu/repository/MenuItemRepository.java, MenuCategoryRepository.java" />}
                {activeCodeFile === 'menu-service' && <CodeBlock code={menuServiceCode} language="java" filename="menu/service/MenuService.java" />}
                {activeCodeFile === 'menu-ctrl' && <CodeBlock code={menuControllerCode} language="java" filename="menu/controller/MenuController.java" />}
                {activeCodeFile === 'order-entity' && <CodeBlock code={orderEntityCode} language="java" filename="order/entity/Order.java, OrderItem.java" />}
                {activeCodeFile === 'order-repo' && <CodeBlock code={orderRepoCode} language="java" filename="order/repository/OrderRepository.java" />}
                {activeCodeFile === 'order-service' && <CodeBlock code={orderServiceCode} language="java" filename="order/service/OrderService.java" />}
                {activeCodeFile === 'order-ctrl' && <CodeBlock code={orderControllerCode} language="java" filename="order/controller/OrderController.java" />}
                {activeCodeFile === 'delivery-entity' && <CodeBlock code={deliveryEntityCode} language="java" filename="delivery/entity/Delivery.java" />}
                {activeCodeFile === 'delivery-repo' && <CodeBlock code={deliveryRepoCode} language="java" filename="delivery/repository/DeliveryRepository.java" />}
                {activeCodeFile === 'delivery-service' && <CodeBlock code={deliveryServiceCode} language="java" filename="delivery/service/DeliveryService.java" />}
                {activeCodeFile === 'delivery-ctrl' && <CodeBlock code={deliveryControllerCode} language="java" filename="delivery/controller/DeliveryController.java" />}
                {activeCodeFile === 'seeder' && <CodeBlock code={dataSeederCode} language="java" filename="config/DataSeeder.java" />}
                {activeCodeFile === 'swagger' && <CodeBlock code={swaggerConfigCode} language="java" filename="config/SwaggerConfig.java" />}
              </div>
            </div>
          )}

          {/* API REFERENCE */}
          {activeSection === 'api' && (
            <div className="space-y-8">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">📡 API Endpoints</h3>
                <p className="text-gray-400 text-sm mb-6">
                  All endpoints prefixed with <code className="bg-gray-700 px-2 py-0.5 rounded text-orange-400">/api/v1</code>. 
                  Interactive docs at <code className="bg-gray-700 px-2 py-0.5 rounded text-green-400">/swagger-ui.html</code>
                </p>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">📋 Menu APIs</h4>
                  <div className="space-y-3">
                    <ApiEndpoint method="GET" path="/api/v1/menus" desc="Get all categories" />
                    <ApiEndpoint method="GET" path="/api/v1/items" desc="Get all menu items" />
                    <ApiEndpoint method="POST" path="/api/v1/items" desc="Create menu item" body={`{\n  "name": "Pizza",\n  "price": 12.99,\n  "type": "FOOD"\n}`} />
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">🛒 Order APIs</h4>
                  <div className="space-y-3">
                    <ApiEndpoint method="POST" path="/api/v1/orders" desc="Create order" body={`{\n  "customerName": "John",\n  "customerAddress": "123 Main St",\n  "customerPhone": "555-1234",\n  "orderItems": [{\n    "menuItemId": 1,\n    "menuItemName": "Pizza",\n    "quantity": 2,\n    "unitPrice": 12.99\n  }]\n}`} />
                    <ApiEndpoint method="GET" path="/api/v1/orders/{id}" desc="Get order" />
                    <ApiEndpoint method="PUT" path="/api/v1/orders/{id}/status" desc="Update status" />
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">🚗 Delivery APIs</h4>
                  <div className="space-y-3">
                    <ApiEndpoint method="POST" path="/api/v1/deliveries" desc="Assign driver" body={`{\n  "orderId": 1,\n  "driverName": "Mike",\n  "driverPhone": "555-5678",\n  "deliveryAddress": "123 Main St"\n}`} />
                    <ApiEndpoint method="GET" path="/api/v1/deliveries/order/{orderId}" desc="Get deliveries" />
                    <ApiEndpoint method="PUT" path="/api/v1/deliveries/{id}/status" desc="Update status" />
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">🔧 Infrastructure</h4>
                  <div className="space-y-3">
                    <ApiEndpoint method="GET" path="/actuator/health" desc="Health check" />
                    <ApiEndpoint method="GET" path="/swagger-ui.html" desc="Swagger UI" />
                    <ApiEndpoint method="GET" path="/h2-console" desc="H2 Console" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RUN & TEST */}
          {activeSection === 'run' && (
            <div className="space-y-8">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🚀 Build & Run</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-semibold text-green-400 mb-2">Build</h4>
                    <CodeBlock code={`cd food-delivery-backend\nmvn clean install`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-green-400 mb-2">Run</h4>
                    <CodeBlock code={`# Option 1: Maven\nmvn spring-boot:run\n\n# Option 2: JAR\njava -jar target/food-delivery-backend-1.0.0.jar`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-green-400 mb-2">Verify</h4>
                    <CodeBlock code={`curl http://localhost:8080/actuator/health\ncurl http://localhost:8080/api/v1/items`} language="bash" filename="Terminal" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🧪 Test APIs</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-semibold text-blue-400 mb-2">Create Order</h4>
                    <CodeBlock code={`curl -X POST http://localhost:8080/api/v1/orders \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "customerName": "Jane Smith",\n    "customerAddress": "456 Oak Ave",\n    "customerPhone": "555-9876",\n    "orderItems": [\n      {"menuItemId": 1, "menuItemName": "Pizza", "quantity": 2, "unitPrice": 12.99}\n    ]\n  }'`} language="bash" filename="Terminal" />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-blue-400 mb-2">Assign Driver</h4>
                    <CodeBlock code={`curl -X POST http://localhost:8080/api/v1/deliveries \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "orderId": 1,\n    "driverName": "Alex",\n    "driverPhone": "555-7890",\n    "deliveryAddress": "456 Oak Ave"\n  }'`} language="bash" filename="Terminal" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🌐 Access Points</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'REST API', url: 'http://localhost:8080/api/v1' },
                    { name: 'Swagger UI', url: 'http://localhost:8080/swagger-ui.html' },
                    { name: 'Health Check', url: 'http://localhost:8080/actuator/health' },
                    { name: 'H2 Console', url: 'http://localhost:8080/h2-console' },
                    { name: 'OpenAPI JSON', url: 'http://localhost:8080/api-docs' },
                  ].map((point) => (
                    <div key={point.name} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h5 className="text-sm font-bold text-white">{point.name}</h5>
                      <p className="text-xs text-orange-400 font-mono mt-1 break-all">{point.url}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ApiEndpoint({ method, path, desc, body }: { method: string; path: string; desc: string; body?: string }) {
  const [expanded, setExpanded] = useState(false);
  
  const methodColors: Record<string, string> = {
    GET: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    POST: 'bg-green-500/20 text-green-400 border-green-500/30',
    PUT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
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
          <pre className="text-xs text-gray-300 bg-gray-800 rounded p-3 overflow-x-auto font-mono whitespace-pre-wrap">{body}</pre>
        </div>
      )}
    </div>
  );
}

// Import all code strings
import {
  pomXml as pomXmlCode,
  applicationProperties as applicationPropertiesCode,
  mainApplication as mainAppCode,
  sharedEnums as sharedEnumsCode,
  sharedExceptions as sharedExceptionsCode,
  globalExceptionHandler as exceptionHandlerCode,
  menuEntities as menuEntityCode,
  menuRepositories as menuRepoCode,
  menuService as menuServiceCode,
  menuController as menuControllerCode,
  orderEntity as orderEntityCode,
  orderRepository as orderRepoCode,
  orderService as orderServiceCode,
  orderController as orderControllerCode,
  deliveryEntity as deliveryEntityCode,
  deliveryRepository as deliveryRepoCode,
  deliveryService as deliveryServiceCode,
  deliveryController as deliveryControllerCode,
  dataSeeder as dataSeederCode,
  swaggerConfig as swaggerConfigCode,
} from './data/javaCode';

export default App;
