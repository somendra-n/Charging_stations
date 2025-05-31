<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-card">
      <!-- Header -->
      <header class="dashboard-header">
        <h1 class="title">⚡ EV Charger Dashboard</h1>
        <button @click="logout" class="btn-logout">Logout</button>
      </header>

      <!-- Main Content -->
      <div class="dashboard-content">
        <section class="charger-list">
          <ChargerList />
        </section>

        <section class="charger-map">
          <template v-if="!loading">
            <ChargerMap :chargers="chargers" />
          </template>
          <template v-else>
            <p>Loading chargers...</p>
          </template>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ChargerList from '../components/ChargerList.vue';
import ChargerMap from '../components/ChargerMap.vue';

export default {
  name: 'DashboardView',
  components: { ChargerList, ChargerMap },
  setup() {
    const store = useStore();
    const loading = ref(true);

    onMounted(async () => {
      await store.dispatch('fetchChargers');
      loading.value = false;
    });

    const chargers = computed(() => store.state.chargers);

    const logout = () => {
      localStorage.removeItem('token');
      store.commit('setUser', null);
      window.location.href = '/login';
    };

    return { chargers, loading, logout };
  },
};
</script>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  background: #f0f4f8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
}

.dashboard-card {
  width: 100%;
  max-width: 1200px;
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem 2.5rem;
  box-shadow:
    0 6px 15px rgba(0, 0, 0, 0.1),
    0 2px 10px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
}

.dashboard-card:hover {
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.12),
    0 4px 15px rgba(0, 0, 0, 0.08);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a202c;
  letter-spacing: 0.03em;
  user-select: none;
}

.btn-logout {
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
  color: #fff;
  font-weight: 600;
  padding: 0.8rem 1.4rem;
  font-size: 1rem;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  transition: background 0.3s ease, transform 0.2s ease;
}

.btn-logout:hover {
  background: linear-gradient(90deg, #1e40af 0%, #2563eb 100%);
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.6);
  transform: translateY(-2px);
}

.dashboard-content {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

/* List styling */
.charger-list {
  flex: 1;
  min-width: 320px;
  background: #f9fafb;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #d1d5db;
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.05),
    0 1px 4px rgba(0, 0, 0, 0.04);
  overflow-y: auto;
  max-height: 600px;
}

/* Enhance list items if scoped from component */
.charger-list ::v-deep(.charger-item) {
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.charger-list ::v-deep(.charger-item:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

/* Map styling */
.charger-map {
  flex: 2;
  min-height: 500px;
  background: #e2e8f0;
  border-radius: 16px;
  border: 3px solid #2563eb;
  overflow: hidden;
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.05);
}

/* Responsive design */
@media (max-width: 768px) {
  .dashboard-content {
    flex-direction: column;
  }

  .charger-list,
  .charger-map {
    width: 100%;
    max-width: 100%;
  }
}
</style>
