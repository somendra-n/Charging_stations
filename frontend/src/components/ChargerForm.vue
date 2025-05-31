<template>
  <!-- Form for adding or editing a charger -->
  <form @submit.prevent="handleSubmit" class="charger-form">
    <!-- Show 'Edit Charger' if editing, otherwise 'Add Charger' -->
    <h3>{{ form._id ? 'Edit Charger' : 'Add Charger' }}</h3>
    
    <!-- Charger name input -->
    <input
      v-model="form.name"
      placeholder="Charger Name"
      required
    />
    
    <!-- Latitude input, bound as a number -->
    <input
      v-model.number="form.location.lat"
      placeholder="Latitude"
      type="number"
      step="any"
      required
    />
    
    <!-- Longitude input, bound as a number -->
    <input
      v-model.number="form.location.lng"
      placeholder="Longitude"
      type="number"
      step="any"
      required
    />
    
    <!-- Power output input with minimum 0 -->
    <input
      v-model.number="form.powerOutput"
      placeholder="Power Output (kW)"
      type="number"
      min="0"
      required
    />
    
    <!-- Connector type input -->
    <input
      v-model="form.connectorType"
      placeholder="Connector Type"
      required
    />
    
    <!-- Status select dropdown -->
    <select v-model="form.status" required>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
    
    <!-- Submit and cancel buttons -->
    <div>
      <button type="submit">{{ form._id ? 'Update' : 'Add' }}</button>
      <button type="button" @click="cancel">Cancel</button>
    </div>
  </form>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  props: ['charger'], // receive charger data if editing

  setup(props, { emit }) {
    const store = useStore();

    // Form state initialized with default empty values
    const form = ref({
      _id: null,
      name: '',
      location: { lat: 0, lng: 0 },
      powerOutput: 0,
      connectorType: '',
      status: 'Active',
    });

    // Watch for changes in the prop 'charger'
    // If a charger is passed in (editing), populate form with its data
    // If not, reset form to empty defaults for adding new charger
    watch(
      () => props.charger,
      (newVal) => {
        if (newVal) {
          form.value = { ...newVal };
        } else {
          form.value = {
            _id: null,
            name: '',
            location: { lat: 0, lng: 0 },
            powerOutput: 0,
            connectorType: '',
            status: 'Active',
          };
        }
      },
      { immediate: true } // run watcher immediately on mount
    );

    // Called when form is submitted
    // Dispatches Vuex actions to add or update charger accordingly
    const handleSubmit = async () => {
      if (form.value._id) {
        // Editing existing charger
        await store.dispatch('updateCharger', {
          id: form.value._id,
          charger: form.value,
        });
      } else {
        // Adding new charger
        await store.dispatch('addCharger', form.value);
      }
      // Notify parent component that save is done (to maybe close form)
      emit('saved');
    };

    // Called when user clicks Cancel button
    // Simply emits 'saved' event to notify parent to close/reset form
    const cancel = () => {
      emit('saved');
    };

    return { form, handleSubmit, cancel };
  },
};
</script>

<style scoped>
/* Form container styling */
.charger-form {
  background: #fff;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* Inputs and select styled to be full width with some spacing */
.charger-form input,
.charger-form select {
  display: block;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

/* Spacing between buttons */
.charger-form button {
  margin-right: 0.5rem;
}
</style>
