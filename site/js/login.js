(() => {
  const SUPABASE_URL = 'https://qyuczfpgydgqywgthgrz.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_2NLEuDREplLS9DgUXeA8Tw_f8MJOhCq';
  const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  const openSignupBtn = document.getElementById('openSignupBtn');
  const authModal = document.getElementById('authModal');
  const closeModal = document.getElementById('closeModal');
  const loginView = document.getElementById('loginView');
  const loggedInView = document.getElementById('loggedInView');
  const loginForm = document.getElementById('loginForm');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const authSubmitBtn = document.getElementById('authSubmitBtn');
  const authMessage = document.getElementById('authMessage');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const toggleAuthMode = document.getElementById('toggleAuthMode');
  const toggleText = document.getElementById('toggleText');
  const forgotPassword = document.getElementById('forgotPassword');
  const loggedInAvatar = document.getElementById('loggedInAvatar');
  const loggedInName = document.getElementById('loggedInName');
  const loggedInEmail = document.getElementById('loggedInEmail');
  const logoutBtn = document.getElementById('logoutBtn');
  const statusText = document.getElementById('statusText');
  const emailInput = document.getElementById('emailInput');
  let currentUser = null;
  let isSignUp = true;
  let typingTimer;
  const phrases = ['Type your email here…', 'Join our newsletter…', 'Get early access…', 'Stay in the loop…'];

  function message(text, type = '') {
    authMessage.textContent = text;
    authMessage.className = `auth-message ${type}`;
  }
  function setMode(signUp) {
    isSignUp = signUp;
    modalTitle.textContent = signUp ? 'Join Email List' : 'Sign In';
    modalSub.textContent = signUp ? 'Stay updated with FEDPromptly.' : 'Enter your credentials to continue.';
    authSubmitBtn.textContent = signUp ? 'Join Email List' : 'Sign In';
    toggleText.textContent = signUp ? 'Already joined?' : 'New here?';
    toggleAuthMode.textContent = signUp ? 'Sign In' : 'Join Email List';
    message('');
  }
  function showLogin() { loginView.style.display = 'block'; loggedInView.style.display = 'none'; }
  function showAccount(user) {
    loginView.style.display = 'none'; loggedInView.style.display = 'block';
    const name = user.email?.split('@')[0] || 'User';
    loggedInAvatar.textContent = name.charAt(0).toUpperCase();
    loggedInName.textContent = name;
    loggedInEmail.textContent = user.email || '';
    statusText.textContent = 'Signed in';
    emailInput.placeholder = 'View your account…';
  }
  function showModal() {
    authModal.classList.add('active');
    message('');
    if (currentUser) showAccount(currentUser);
    else { setMode(true); showLogin(); loginForm.reset(); setTimeout(() => loginEmail.focus(), 80); }
  }
  function close() { authModal.classList.remove('active'); message(''); }
  function startTyping() {
    let pi = 0, ci = 0, deleting = false;
    function step() {
      if (currentUser || !authModal) return;
      const phrase = phrases[pi];
      if (!deleting) { ci += 1; emailInput.placeholder = `${phrase.slice(0, ci)}|`; if (ci >= phrase.length) deleting = true; }
      else { ci -= 1; emailInput.placeholder = `${phrase.slice(0, ci)}|`; if (ci <= 0) { deleting = false; pi = (pi + 1) % phrases.length; } }
      typingTimer = setTimeout(step, deleting ? 35 : (ci >= phrase.length ? 1600 : 65));
    }
    clearTimeout(typingTimer); step();
  }
  async function submit(email, password) {
    if (!supabaseClient) throw new Error('Authentication is unavailable until the Supabase client loads.');
    if (isSignUp) {
      const { data, error } = await supabaseClient.auth.signUp({ email, password, options: { emailRedirectTo: window.location.href } });
      if (error) throw error;
      if (!data.session) { message('Please check your email to confirm your subscription.', 'info'); return; }
      currentUser = data.user; message(`Welcome, ${email.split('@')[0]}!`, 'success'); setTimeout(() => showAccount(currentUser), 650);
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      currentUser = data.user; message(`Welcome back, ${email.split('@')[0]}!`, 'success'); setTimeout(() => showAccount(currentUser), 650);
    }
  }
  openSignupBtn.addEventListener('click', showModal);
  openSignupBtn.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showModal(); } });
  closeModal.addEventListener('click', close);
  authModal.addEventListener('click', (event) => { if (event.target === authModal) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && authModal.classList.contains('active')) close(); });
  toggleAuthMode.addEventListener('click', () => { setMode(!isSignUp); loginForm.reset(); });
  forgotPassword.addEventListener('click', async () => {
    if (!loginEmail.value.trim()) { message('Enter your email address first.', 'error'); return; }
    const { error } = await supabaseClient.auth.resetPasswordForEmail(loginEmail.value.trim(), { redirectTo: window.location.href });
    message(error ? error.message : 'Password reset email sent. Check your inbox.', error ? 'error' : 'info');
  });
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = loginEmail.value.trim(); const password = loginPassword.value;
    authSubmitBtn.disabled = true; authSubmitBtn.textContent = isSignUp ? 'Joining…' : 'Signing in…';
    try { await submit(email, password); } catch (error) { message(error.message || 'Authentication failed.', 'error'); }
    authSubmitBtn.disabled = false; authSubmitBtn.textContent = isSignUp ? 'Join Email List' : 'Sign In';
  });
  logoutBtn.addEventListener('click', async () => { await supabaseClient.auth.signOut(); currentUser = null; setMode(true); showLogin(); statusText.textContent = 'Join now'; startTyping(); });
  if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange((_event, session) => { currentUser = session?.user || null; if (currentUser) showAccount(currentUser); else { showLogin(); startTyping(); } });
    supabaseClient.auth.getSession().then(({ data }) => { currentUser = data.session?.user || null; if (currentUser) showAccount(currentUser); else startTyping(); });
  } else { message('Authentication client failed to load.', 'error'); startTyping(); }
})();
