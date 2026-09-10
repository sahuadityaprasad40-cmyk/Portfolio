/**
 * APEX TELEMETRY - SIGNAL TRANSMISSION & CONTACT ENGINE
 * Form validation, direct clipboard copy handler, and telemetry toast alerts.
 */

export function initContact() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-email-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'sahuadityaprasad40@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast(`COORDINATES COPIED // ${email}`);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`COORDINATES COPIED // ${email}`);
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('TRANSMISSION ERROR: ALL FIELDS REQUIRED');
        return;
      }

      // Simulate successful transmission dispatch
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>DISPATCHING...</span>`;

      setTimeout(() => {
        showToast(`PACKET DISPATCHED // THANK YOU, ${name.toUpperCase()}`);
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 700);
    });
  }
}

export function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-dot"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'opacity 0.25s, transform 0.25s';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}
