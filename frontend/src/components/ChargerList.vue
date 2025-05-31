<template>
  <div>
    <h2>Chargers</h2>

    <!-- Filter inputs to narrow down chargers by status and connector type -->
    <div class="filters">
      <input
        v-model="filters.status"
        placeholder="Filter by status"
      />
      <input
        v-model="filters.connector"
        placeholder="Filter by connector type"
      />
    </div>

    <!-- List of charger cards, filtered based on inputs -->
    <div class="charger-cards">
      <ChargerCard
        v-for="charger in filteredChargers"
        :key="charger._id"
        :charger="charger"
        @edit="editCharger"
        @delete="deleteCharger"
      />
    </div>

    <!-- Charger form for adding or editing -->
    <ChargerForm
      :charger="editingCharger"
      @saved="reloadChargers"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import ChargerCard from './ChargerCard.vue';
import ChargerForm from './ChargerForm.vue';

export default {
  components: { ChargerCard, ChargerForm },

  setup() {
    // Access the Vuex store instance
    const store = useStore();

    // Get chargers from the Vuex store state as a computed property
    const chargers = computed(() => store.state.chargers);

    // Reactive filters object to hold the filter input values
    const filters = ref({
      status: '',      // Filter by charger status (Active/Inactive)
      connector: '',   // Filter by connector type (partial match)
    });

    // Reactive variable to keep track of the charger currently being edited
    const editingCharger = ref(null);

    // Compute the filtered list of chargers based on the filter inputs
    // We check:
    // - If the status filter is empty OR matches the charger's status
    // - If the connector filter is empty OR the charger's connector type contains the filter text (case-insensitive)
    const filteredChargers = computed(() => {
      return chargers.value.filter((charger) => {
        const matchesStatus =
          !filters.value.status || charger.status === filters.value.status;
        const matchesConnector =
          !filters.value.connector ||
          charger.connectorType
            .toLowerCase()
            .includes(filters.value.connector.toLowerCase());

        return matchesStatus && matchesConnector;
      });
    });

    // Reload chargers from the backend by dispatching the fetchChargers action
    // Called after adding/updating/deleting a charger to refresh the list
    const reloadChargers = () => {
      store.dispatch('fetchChargers');
    };

    // Dispatch the deleteCharger action to remove a charger by its id
    const deleteCharger = (id) => {
      store.dispatch('deleteCharger', id);
    };

    // Set the charger to be edited, which will populate the form with its data
    const editCharger = (charger) => {
      editingCharger.value = { ...charger }; // create a shallow copy to avoid direct mutation
    };

    // Return all reactive state and methods to the template
    return {
      filters,
      filteredChargers,
      reloadChargers,
      deleteCharger,
      editCharger,
      editingCharger,
    };
  },
};
</script>

<style scoped>
/* You can add your styling here to make filters and list look nice */
.filters {
  margin-bottom: 1rem;
}

.filters input {
  margin-right: 0.5rem;
  padding: 0.5rem;
  width: 200px;
  box-sizing: border-box;
}

.charger-cards {
  display: flex;
  flex-direction: column;
}
</style>
