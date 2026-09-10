/**
 * APEX TELEMETRY - SKILLS & COMPETENCY MATRIX
 * Technical proficiency data for telemetry gauges.
 */

export const skillsData = [
  {
    domain: "SYSTEMS & ARCHITECTURE",
    description: "Core low-level primitives, concurrency models, and resilient systems design.",
    items: [
      { name: "Go (Golang)", level: 9, meta: "V1.23 // CONCURRENCY" },
      { name: "System Architecture", level: 9, meta: "DISTRIBUTED // EDGES" },
      { name: "Rust & WebAssembly", level: 8, meta: "WASM // ZERO-COST" },
      { name: "Concurrency & WebSockets", level: 9, meta: "HIGH-THROUGHPUT" },
      { name: "Performance Optimization", level: 9, meta: "PROFILING // MEMORY" }
    ]
  },
  {
    domain: "FRONTEND & UI CRAFT",
    description: "Native web platform mastery, custom design tokens, and fluid 60fps telemetry.",
    items: [
      { name: "React & Modern UI", level: 10, meta: "HOOKS // MODULAR" },
      { name: "Vanilla JavaScript (ES6+)", level: 10, meta: "ASYNC // EVENT-LOOP" },
      { name: "HTML5 Semantic Platform", level: 10, meta: "A11Y // WCAG 2.1" },
      { name: "Modern CSS & Design Systems", level: 10, meta: "TOKENS // HAIRLINES" },
      { name: "HTML5 Canvas & 2D Context", level: 8, meta: "60 FPS RENDERING" }
    ]
  },
  {
    domain: "BACKEND & DATA SYSTEMS",
    description: "Distributed service pipelines, persistent storage, and streaming APIs.",
    items: [
      { name: "Node.js Runtime", level: 9, meta: "EVENT-LOOP // ASYNC" },
      { name: "Python / FastAPI", level: 8, meta: "ASYNCIO // INFERENCE" },
      { name: "PostgreSQL & TimescaleDB", level: 8, meta: "TIME-SERIES // INDEX" },
      { name: "Redis Caching & Pub/Sub", level: 9, meta: "MEMORY-STORE" },
      { name: "RESTful & Real-Time APIs", level: 9, meta: "SSE // WEBSOCKETS" }
    ]
  },
  {
    domain: "DEVOPS & TELEMETRY",
    description: "Container orchestration, automated continuous deployment, and telemetry tooling.",
    items: [
      { name: "Docker & Containerization", level: 9, meta: "MULTI-STAGE // OCI" },
      { name: "Linux & Bash Systems", level: 8, meta: "POSIX // SYSADMIN" },
      { name: "Git Version Control", level: 9, meta: "DISCIPLINED LOGS" },
      { name: "CI/CD Deployment Pipelines", level: 8, meta: "AUTOMATED TESTING" },
      { name: "Monitoring & Observability", level: 8, meta: "LOGS // METRICS" }
    ]
  }
];
