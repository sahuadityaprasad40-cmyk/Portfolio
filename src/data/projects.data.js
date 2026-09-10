/**
 * APEX TELEMETRY - PROJECTS DATA REPOSITORY
 * Featured architectural case studies for Aditya Prasad Sahu.
 */

export const projectsData = [
  {
    id: "SYS-01",
    slug: "aegismed",
    title: "AegisMed // Clinical Telemetry AI",
    category: "SYSTEMS",
    subsystem: "CRITICAL CARE TELEMETRY",
    summary: "High-throughput patient vitals telemetry engine and predictive clinical risk scoring pipeline processing streaming biometrics with sub-15ms inference latency.",
    metrics: [
      { label: "LATENCY", value: "12ms" },
      { label: "STABILITY", value: "99.99%" },
      { label: "STREAMS", value: "10K+" }
    ],
    tags: ["Go", "WebSockets", "FastAPI", "Docker", "TimescaleDB"],
    schematic: "assets/images/aegismed.svg",
    demoUrl: "https://github.com/sahuadityaprasad40-cmyk",
    sourceUrl: "https://github.com/sahuadityaprasad40-cmyk"
  },
  {
    id: "SYS-02",
    slug: "chronodrift",
    title: "ChronoDrift // Temporal Physics Engine",
    category: "SYSTEMS",
    subsystem: "DETERMINISTIC SIMULATION",
    summary: "Real-time physics simulator and temporal frame-rewind engine compiled from Rust to WebAssembly with a custom WebGL2 graphics pipeline.",
    metrics: [
      { label: "TICK RATE", value: "60 FPS" },
      { label: "REWIND", value: "1000 Ticks" },
      { label: "FOOTPRINT", value: "4.2 MB" }
    ],
    tags: ["Rust", "WebAssembly", "WebGL2", "TypeScript", "Math"],
    schematic: "assets/images/chronodrift.svg",
    demoUrl: "https://github.com/sahuadityaprasad40-cmyk",
    sourceUrl: "https://github.com/sahuadityaprasad40-cmyk"
  },
  {
    id: "SYS-03",
    slug: "cinestream",
    title: "CineStream // Low-Latency Media Pipeline",
    category: "APIS",
    subsystem: "DISTRIBUTED TRANSCODING",
    summary: "Distributed edge transcoding network featuring automated chunk sharding, WebRTC ultra-low-latency broadcast, and resilient fallback streams.",
    metrics: [
      { label: "BROADCAST", value: "<350ms" },
      { label: "RESOLUTION", value: "4K60 HDR" },
      { label: "NODES", value: "8 Edge" }
    ],
    tags: ["Node.js", "Redis", "FFmpeg", "WebRTC", "Docker"],
    schematic: "assets/images/cinestream.svg",
    demoUrl: "https://github.com/sahuadityaprasad40-cmyk",
    sourceUrl: "https://github.com/sahuadityaprasad40-cmyk"
  },
  {
    id: "SYS-04",
    slug: "neurosync",
    title: "NeuroSync // Neural Telemetry Suite",
    category: "FRONTEND",
    subsystem: "BIOMETRIC VISUALIZER",
    summary: "Zero-dependency real-time EEG signal analyzer and brainwave topology visualizer rendering 120Hz multichannel data on native HTML5 2D/3D canvas.",
    metrics: [
      { label: "FREQUENCY", value: "120 Hz" },
      { label: "CANVAS FPS", value: "60 FPS" },
      { label: "OVERHEAD", value: "<1.5% CPU" }
    ],
    tags: ["Vanilla JS", "Canvas API", "Web Audio", "SSE", "CSS Tokens"],
    schematic: "assets/images/neurosync.svg",
    demoUrl: "https://github.com/sahuadityaprasad40-cmyk",
    sourceUrl: "https://github.com/sahuadityaprasad40-cmyk"
  }
];
