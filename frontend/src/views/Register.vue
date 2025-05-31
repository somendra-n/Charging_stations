<template>
  <div class="register-container">
    <h2 class="title">Create Your Account</h2>
    <form @submit.prevent="handleRegister" class="register-form" novalidate>
      <input
        v-model="name"
        placeholder="Full Name"
        required
        autocomplete="name"
        class="input-field"
        aria-label="Full Name"
      />
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
        autocomplete="new-password"
        class="input-field"
        aria-label="Password"
      />
      <button type="submit" class="btn-submit" aria-label="Register Button">Register</button>
    </form>
    <p class="login-link">
      Already have an account?
      <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async handleRegister() {
      try {
        await this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        alert(error.message || 'Registration failed');
      }
    },
  },
};
</script>

<style scoped>
/* Main container: clean card with balanced padding and shadow */
.register-container {
  max-width: 420px;
  margin: 6rem auto;
  padding: 3.5rem 3.5rem 3rem;
  background: #ffffff;
  border-radius: 18px;
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3748;
  transition: box-shadow 0.3s ease;
}

/* Hover effect for subtle lift */
.register-container:hover {
  box-shadow:
    0 14px 35px rgba(0, 0, 0, 0.12),
    0 6px 20px rgba(0, 0, 0, 0.07);
}

/* Title: clear, friendly, balanced size and weight */
.title {
  text-align: center;
  font-weight: 700;
  font-size: 2.25rem;
  margin-bottom: 3rem;
  color: #1a202c;
  letter-spacing: 0.04em;
  user-select: none;
}

/* Form layout: vertical with consistent spacing */
.register-form {
  display: flex;
  flex-direction: column;
}

/* Input fields: spacious, subtle shadows, clean border */
.input-field {
  padding: 1rem 1.25rem;
  margin-bottom: 1.7rem;
  font-size: 1.12rem;
  border-radius: 14px;
  border: 1.6px solid #d1d5db; /* light gray */
  background-color: #fefefe;
  color: #1a202c;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  outline-offset: 3px;
  outline-color: transparent;
  font-weight: 500;
  caret-color: #2563eb;
}

/* Input focus: bright blue border and gentle glow */
.input-field:focus {
  border-color: #2563eb;
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.4);
  outline-color: #2563eb;
  background-color: #fff;
}

/* Submit button: smooth blue gradient, clear CTA, balanced padding */
.btn-submit {
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
  color: #fff;
  font-weight: 700;
  padding: 1.15rem 0;
  font-size: 1.18rem;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 7px 25px rgba(59, 130, 246, 0.48);
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  letter-spacing: 0.03em;
}

/* Button hover: darker blue and glow */
.btn-submit:hover {
  background: linear-gradient(90deg, #1e40af 0%, #2563eb 100%);
  box-shadow: 0 12px 35px rgba(37, 99, 235, 0.7);
  transform: translateY(-3px);
}

/* Button active press */
.btn-submit:active {
  transform: translateY(0);
  box-shadow: 0 7px 20px rgba(37, 99, 235, 0.5);
}

/* Below form text: subtle, centered */
.login-link {
  margin-top: 2.5rem;
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
  color: #718096;
  user-select: none;
}

/* Link styling */
.login-link a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #1e40af;
  text-decoration: underline;
}

/* Responsive tweak: reduce horizontal padding on smaller screens */
@media (max-width: 460px) {
  .register-container {
    margin: 3rem 1.5rem;
    padding: 2.5rem 2rem 2rem;
  }
}
</style>
