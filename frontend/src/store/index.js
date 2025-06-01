import { createStore } from 'vuex';

const API_BASE = process.env.VUE_APP_API_BASE;

export default createStore({
  state: {
    user: null,
    chargers: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setChargers(state, chargers) {
      state.chargers = chargers;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      commit('setUser', data.user);
    },

    async fetchChargers({ commit }) {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/chargers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      commit('setChargers', data);
    },

    async addCharger({ dispatch }, charger) {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/chargers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(charger),
      });
      if (!res.ok) throw new Error('Failed to add charger');
      await dispatch('fetchChargers');
    },

    async updateCharger({ dispatch }, { id, charger }) {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/chargers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(charger),
      });
      if (!res.ok) throw new Error('Failed to update charger');
      await dispatch('fetchChargers');
    },

    async deleteCharger({ dispatch }, id) {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/chargers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete charger');
      await dispatch('fetchChargers');
    },
    async register({ commit }, { name, email, password }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  // If your backend returns token and user data on registration:
  localStorage.setItem('token', data.token);
  commit('setUser', data.user);
},logout({ commit }) {
  localStorage.removeItem('token');
  commit('setUser', null);
  // Redirect to login page
  window.location.href = '/login'; // assuming your login route is '/login'
},

  },
});
