<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="Password" type="password" required />
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const handleLogin = async () => {
      try {
        await store.dispatch('login', { email: email.value, password: password.value });
        router.push('/chargers');
      } catch (err) {
        alert('Login failed: ' + err.response.data.message);
      }
    };

    return { email, password, handleLogin };
  },
};
</script>
