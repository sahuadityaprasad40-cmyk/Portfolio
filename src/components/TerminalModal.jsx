import React, { useState, useEffect, useRef } from 'react';
import { projectsData } from '../data/projects.data.js';
import { skillsData } from '../data/skills.data.js';

export default function TerminalModal({ isOpen, onClose, onToggleTheme }) {
  const [lines, setLines] = useState([
    { text: "=============================================================", type: "sys" },
    { text: "APEX TELEMETRY TERMINAL SHELL // ADITYA PRASAD SAHU", type: "sys" },
    { text: "Type 'help' for a full manifest of telemetry commands.", type: "sys" },
    { text: "Quick shortcuts: `~` or `Ctrl+K` to toggle. Press `Escape` to close.", type: "sys" },
    { text: "=============================================================", type: "sys" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const newLines = [...lines, { text: `guest@apex-telemetry:~$ ${raw}`, type: "prompt-echo" }];

    switch (cmd) {
      case 'help':
        newLines.push(
          { text: "Available Telemetry Commands:", type: "sys" },
          { text: "  help       - Display this command index", type: "" },
          { text: "  about      - Display engineer persona and technical identity", type: "" },
          { text: "  projects   - Query all featured architecture case studies", type: "" },
          { text: "  skills     - Output technical competence telemetry matrix", type: "" },
          { text: "  contact    - Retrieve direct transmission channels and email", type: "" },
          { text: "  theme      - Toggle between Obsidian (dark) and Light mode", type: "" },
          { text: "  date       - Output synchronized UTC/Local timestamp", type: "" },
          { text: "  clear      - Purge terminal console buffer", type: "" },
          { text: "  exit       - Close tactical terminal session", type: "" }
        );
        break;

      case 'about':
        newLines.push(
          { text: "ADITYA PRASAD SAHU // APEX-01", type: "warn" },
          { text: "Role: Full-Stack Systems Engineer & Software Architect", type: "" },
          { text: "Coordinates: 20.2961° N, 85.8245° E (India / IST)", type: "" },
          { text: "Specialization: High-throughput telemetry, low-latency microservices, deterministic rendering engines, and zero-bloat web platform craft.", type: "" }
        );
        break;

      case 'projects':
        newLines.push({ text: "Active Production Deployments:", type: "sys" });
        projectsData.forEach((p, idx) => {
          newLines.push(
            { text: `[${idx + 1}] ${p.title} (${p.category})`, type: "warn" },
            { text: `    ${p.summary}`, type: "" },
            { text: `    Stack: ${p.tags.join(', ')}`, type: "sys" }
          );
        });
        break;

      case 'skills':
        newLines.push({ text: "Core Technical Arsenal Telemetry:", type: "sys" });
        skillsData.forEach(domain => {
          newLines.push({ text: `\n-- ${domain.domain} --`, type: "warn" });
          domain.items.forEach(item => {
            const bar = '█'.repeat(item.level) + '░'.repeat(10 - item.level);
            newLines.push({ text: `  ${item.name.padEnd(28, ' ')} [${bar}] ${item.level * 10}%`, type: "" });
          });
        });
        break;

      case 'contact':
        newLines.push(
          { text: "Direct Transmission Channels:", type: "sys" },
          { text: "  Email:    sahuadityaprasad40@gmail.com", type: "" },
          { text: "  GitHub:   https://github.com/sahuadityaprasad40-cmyk", type: "" },
          { text: "  Location: India (UTC+5:30)", type: "" },
          { text: "  Status:   ACTIVE FOR OPPORTUNITIES", type: "success" }
        );
        break;

      case 'theme':
        onToggleTheme();
        newLines.push({ text: "Theme toggled successfully.", type: "success" });
        break;

      case 'date':
        newLines.push(
          { text: `UTC:   ${new Date().toUTCString()}`, type: "" },
          { text: `Local: ${new Date().toString()}`, type: "" }
        );
        break;

      case 'clear':
        setLines([
          { text: "APEX TELEMETRY CLI [V2026.1] - Type 'help' for commands.", type: "sys" }
        ]);
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      case 'sudo':
        newLines.push({ text: "guest is not in the sudoers file. This incident has been logged to telemetry.", type: "warn" });
        break;

      default:
        newLines.push({ text: `command not found: ${cmd}. Type 'help' for valid instructions.`, type: "sys" });
        break;
    }

    setLines(newLines);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const val = inputValue.trim();
      if (val) {
        setHistory(prev => [...prev, val]);
        setHistoryIdx(history.length + 1);
        executeCommand(val);
      }
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputValue(history[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputValue(history[nextIdx] || '');
      } else {
        setHistoryIdx(history.length);
        setInputValue('');
      }
    }
  };

  return (
    <div
      id="terminal-overlay"
      className={`terminal-overlay ${isOpen ? 'active' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Tactical Command Palette"
      onClick={(e) => {
        if (e.target.id === 'terminal-overlay') onClose();
      }}
    >
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-title">
            <span>&gt;_</span> APEX TELEMETRY CLI [V2026.1] // ACTIVE SESSION
          </div>

          <div className="terminal-quick-actions">
            <button className="terminal-pill-btn" onClick={() => executeCommand('help')}>help</button>
            <button className="terminal-pill-btn" onClick={() => executeCommand('about')}>about</button>
            <button className="terminal-pill-btn" onClick={() => executeCommand('projects')}>projects</button>
            <button className="terminal-pill-btn" onClick={() => executeCommand('skills')}>skills</button>
            <button className="terminal-pill-btn" onClick={() => executeCommand('contact')}>contact</button>
            <button className="terminal-pill-btn" onClick={() => executeCommand('clear')}>clear</button>
            <button className="terminal-close-btn" onClick={onClose} aria-label="Close Terminal">✕</button>
          </div>
        </div>

        <div ref={bodyRef} id="terminal-body" className="terminal-body">
          {lines.map((line, idx) => (
            <div key={idx} className={`terminal-line ${line.type}`}>
              {line.text}
            </div>
          ))}
        </div>

        <div className="terminal-input-row">
          <span className="terminal-prompt-sym">guest@apex:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            autoComplete="off"
            spellCheck="false"
            placeholder="type a command (e.g. help, projects, skills)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}
