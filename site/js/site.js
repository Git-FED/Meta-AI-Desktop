(() => {
  const gate = document.querySelector('[data-age-gate]');
  const openers = document.querySelectorAll('[data-open-age-gate]');
  const cancel = document.querySelector('[data-age-cancel]');
  const approve = document.querySelector('[data-age-approve]');
  const payment = document.querySelector('[data-payment-area]');
  const status = document.querySelector('[data-gate-status]');
  const STORAGE_KEY = 'gitfed-age-confirmed';

  function openGate() { if (gate) gate.classList.add('open'); }
  function closeGate() { if (gate) gate.classList.remove('open'); }
  openers.forEach((button) => button.addEventListener('click', openGate));
  if (cancel) cancel.addEventListener('click', closeGate);
  if (approve) approve.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'yes');
    if (payment) payment.classList.add('revealed');
    if (typeof window.initPayments === 'function') window.initPayments();
    if (status) status.textContent = 'Age confirmed. Payment choices are unlocked for this browser.';
    closeGate();
  });
  if (payment && localStorage.getItem(STORAGE_KEY) === 'yes') payment.classList.add('revealed');

  const form = document.querySelector('[data-substack-form]');
  if (form) form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input[type=email]');
    const message = form.querySelector('[data-form-message]');
    if (!input.value || !/^\S+@\S+\.\S+$/.test(input.value)) {
      message.textContent = 'Please enter a valid email address.';
      message.dataset.state = 'error';
      return;
    }
    message.textContent = 'Opening the newsletter page…';
    message.dataset.state = 'success';
    window.location.href = `subscribe.html?email=${encodeURIComponent(input.value)}`;
  });
})();
