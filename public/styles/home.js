const authDiv = document.getElementById('auth-status');

fetch('/auth/status')
  .then(res => res.json())
  .then(data => {
    if (data.loggedIn) {
      authDiv.innerHTML = `
        <span class="user-greeting">👋 ${data.user.displayName}</span>
        <a href="/auth/logout" class="auth-btn logout-btn">🚪 Logout</a>
      `;
    } else {
      authDiv.innerHTML = `
        <a href="/auth/github" class="auth-btn login-btn">🔐 Login with GitHub</a>
      `;
    }
  })
  .catch(() => {
    authDiv.innerHTML = `
      <a href="/auth/github" class="auth-btn login-btn">🔐 Login with GitHub</a>
    `;
  });