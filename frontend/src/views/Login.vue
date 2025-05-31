<template>
  <div class="login-container">
    <h2 class="title">Welcome to⚡EV </h2>
    <form @submit.prevent="handleLogin" class="login-form" novalidate>
      <input
        v-model="email"
        type="email"
        placeholder="Email Address"
        required
        autocomplete="email"
        class="input-field"
        aria-label="Email Address"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        autocomplete="current-password"
        class="input-field"
        aria-label="Password"
      />
      <button type="submit" class="btn-submit" aria-label="Login Button">Login</button>
    </form>
    <p class="register-link">
      Don't have an account?
      <router-link to="/register">Register here</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Main container with subtle shadow and modern white card style */
.login-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 3rem 3.5rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow:
    0 6px 15px rgba(0, 0, 0, 0.1),
    0 2px 10px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3748;
  transition: box-shadow 0.3s ease;
}

/* Slight lift effect on hover for the card */
.login-container:hover {
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.12),
    0 4px 15px rgba(0, 0, 0, 0.08);
}

/* Clear and elegant title */
.title {
  text-align: center;
  font-weight: 700;
  font-size: 2.4rem;
  margin-bottom: 2.8rem;
  color: #1a202c; /* dark slate */
  letter-spacing: 0.05em;
  user-select: none;
}

/* Vertical layout for the form */
.login-form {
  display: flex;
  flex-direction: column;
}

/* Input fields with gentle shadows and smooth border */
.input-field {
  padding: 1rem 1.3rem;
  margin-bottom: 1.8rem;
  font-size: 1.1rem;
  border-radius: 14px;
  border: 1.8px solid #e2e8f0; /* light gray */
  background-color: #f9fafb;
  color: #1a202c;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline-offset: 3px;
  outline-color: transparent;
  font-weight: 500;
}

/* Focus state: bright blue border and subtle glow */
.input-field:focus {
  border-color: #3182ce;
  box-shadow: 0 0 12px rgba(49, 130, 206, 0.5);
  outline-color: #3182ce;
  background-color: #fff;
}

/* Smooth, vibrant submit button */
.btn-submit {
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
  color: #fff;
  font-weight: 700;
  padding: 1.15rem 0;
  font-size: 1.2rem;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  letter-spacing: 0.03em;
}

/* Hover effect: slightly darker and glowing */
.btn-submit:hover {
  background: linear-gradient(90deg, #1e40af 0%, #2563eb 100%);
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.75);
  transform: translateY(-3px);
}

/* Active state on button press */
.btn-submit:active {
  transform: translateY(0);
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.5);
}

/* Link below the form for registration */
.register-link {
  margin-top: 2rem;
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
  color: #718096; /* muted gray */
  user-select: none;
}

/* Styled router-link */
.register-link a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

/* Hover effect on register link */
.register-link a:hover {
  color: #1e40af;
  text-decoration: underline;
}
</style>
