<template>
  <!-- Single card showing charger details -->
  <div class="charger-card">
    <!-- Display charger name as the card title -->
    <h3>{{ charger.name }}</h3>
    
    <!-- Show the status of the charger -->
    <p><strong>Status:</strong> {{ charger.status }}</p>
    
    <!-- Display the type of connector this charger uses -->
    <p><strong>Connector:</strong> {{ charger.connectorType }}</p>
    
    <!-- Show power output in kilowatts -->
    <p><strong>Power Output:</strong> {{ charger.powerOutput }} kW</p>
    
    <!-- Edit button emits 'edit' event with charger data -->
    <button @click="$emit('edit', charger)">Edit</button>
    
    <!-- Delete button emits 'delete' event with charger ID -->
    <button @click="$emit('delete', charger._id)">Delete</button>
  </div>
</template>

<script>
export default {
  // Props to receive charger object from parent
  props: ['charger'],
};
</script>

<style scoped>
/* Basic styling for the charger card */
.charger-card {
  border: 1px solid #ccc;       /* subtle border around card */
  padding: 1rem;                /* spacing inside card */
  margin-bottom: 1rem;          /* space between cards */
  border-radius: 4px;           /* rounded corners */
  background: #f9f9f9;          /* light gray background */
}

/* Add some spacing between buttons */
.charger-card button {
  margin-right: 0.5rem;
}
</style>
