/**
 * APEX TELEMETRY - TACTICAL CLI TERMINAL EMULATOR
 * Interactive shell overlay supporting system commands and keyboard shortcuts.
 */

import { projectsData } from '../data/projects.data.js';
import { skillsData } from '../data/skills.data.js';
import { applyTheme } from './theme.js';

export function initTerminal() {
  const overlay = document.getElementById('terminal-overlay');
  const openBtn = document.getElementById('terminal-open-btn');
  const closeBtn = document.getElementById('terminal-close-btn');
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');
  const quickPills = document.querySelectorAll('.terminal-pill-btn');

  if (!overlay || !input || !body) return;

  let history = [];
  let historyIdx = -1;

  function openTerminal() {
    overlay.classList.add('active');
    setTimeout(() => input.focus(), 150);
  }

  function closeTerminal() {
    overlay.classList.remove('active');
  }

  // Event Listeners
  if (openBtn) openBtn.addEventListener('click', openTerminal);
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeTerminal();
  });

  // Global hotkeys (~ or Ctrl+K to toggle, Escape to close)
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        overlay.classList.contains('active') ? closeTerminal() : openTerminal();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      overlay.classList.contains('active') ? closeTerminal() : openTerminal();
    } else if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeTerminal();
    }
  });

  // Quick pill actions
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  // Terminal Input Handling
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim();
      if (val) {
        history.push(val);
        historyIdx = history.length;
        executeCommand(val);
      }
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIdx > 0) {
        historyIdx--;
        input.value = history[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < history.length - 1) {
        historyIdx++;
        input.value = history[historyIdx];
      } else {
        historyIdx = history.length;
        input.value = '';
      }
    }
  });

  function appendLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.textContent = text;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  function executeCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    appendLine(`guest@apex-telemetry:~$ ${raw}`, 'prompt-echo');

    switch (cmd) {
      case 'help':
        appendLine("Available Telemetry Commands:", "sys");
        appendLine("  help       - Display this command index");
        appendLine("  about      - Display engineer persona and technical identity");
        appendLine("  projects   - Query all featured architecture case studies");
        appendLine("  skills     - Output technical competence telemetry matrix");
        appendLine("  contact    - Retrieve direct transmission channels and email");
        appendLine("  theme      - Toggle between Obsidian (dark) and Light mode");
        appendLine("  date       - Output synchronized UTC/Local timestamp");
        appendLine("  clear      - Purge terminal console buffer");
        appendLine("  exit       - Close tactical terminal session");
        break;

      case 'about':
        appendLine("ADITYA PRASAD SAHU // APEX-01", "warn");
        appendLine("Role: Full-Stack Systems Engineer & Software Architect");
        appendLine("Coordinates: 20.2961° N, 85.8245° E (India / IST)");
        appendLine("Specialization: High-throughput telemetry, low-latency microservices, deterministic rendering engines, and zero-bloat web platform craft.");
        break;

      case 'projects':
        appendLine("Active Production Deployments:", "sys");
        projectsData.forEach((p, idx) => {
          appendLine(`[${idx + 1}] ${p.title} (${p.category})`);
          appendLine(`    ${p.summary}`);
          appendLine(`    Stack: ${p.tags.join(', ')}`);
        });
        break;

      case 'skills':
        appendLine("Core Technical Arsenal Telemetry:", "sys");
        skillsData.forEach(domain => {
          appendLine(`\n-- ${domain.domain} --`, "warn");
          domain.items.forEach(item => {
            const bar = '█'.repeat(item.level) + '░'.repeat(10 - item.level);
            appendLine(`  ${item.name.padEnd(28, ' ')} [${bar}] ${item.level * 10}%`);
          });
        });
        break;

      case 'contact':
        appendLine("Direct Transmission Channels:", "sys");
        appendLine("  Email:    sahuadityaprasad40@gmail.com");
        appendLine("  GitHub:   https://github.com/sahuadityaprasad40-cmyk");
        appendLine("  Location: India (UTC+5:30)");
        appendLine("  Status:   ACTIVE FOR OPPORTUNITIES", "success");
        break;

      case 'theme':
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('apex_theme', next);
        appendLine(`Theme updated to: ${next.toUpperCase()}`, "success");
        break;

      case 'date':
        appendLine(`UTC:   ${new Date().toUTCString()}`);
        appendLine(`Local: ${new Date().toString()}`);
        break;

      case 'clear':
        body.innerHTML = '';
        appendLine("APEX TELEMETRY CLI [Version 2026.1] - Type 'help' for commands.", "sys");
        break;

      case 'exit':
      case 'quit':
        closeTerminal();
        break;

      case 'sudo':
        appendLine("guest is not in the sudoers file. This incident has been logged to telemetry.", "warn");
        break;

      default:
        appendLine(`command not found: ${cmd}. Type 'help' for valid instructions.`, "sys");
        break;
    }
  }
}
