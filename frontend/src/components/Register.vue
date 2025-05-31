<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="Password" type="password" required />
      <button type="submit">Register</button>
    </form>
    <p>
      Already have an account? <router-link to="/login">Login</router-link>
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
    const name = ref('');
    const email = ref('');
    const password = ref('');

    const handleRegister = async () => {
      try {
        await store.dispatch('register', { name: name.value, email: email.value, password: password.value });
        router.push('/chargers');
      } catch (err) {
        alert('Registration failed: ' + err.response.data.message);
      }
    };

    return { name, email, password, handleRegister };
  },
};
</script>
