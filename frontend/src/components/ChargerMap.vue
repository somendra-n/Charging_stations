<template>
  <!-- This div is where the Leaflet map will be rendered -->
  <div id="map" style="height: 500px;"></div>
</template>

<script>
import { onMounted, watch, ref } from 'vue';
import L from 'leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// URL for the custom red marker icon
const redIconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';

export default {
  name: 'ChargerMap',
  props: {
    // Expect an array of chargers, each with location and details
    chargers: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    let map; // Leaflet map instance
    const markers = ref([]); // We'll keep track of marker instances here so we can clear/update them

    // Define a custom red icon for markers using Leaflet's icon API
    const redIcon = L.icon({
      iconUrl: redIconUrl,
      shadowUrl: markerShadow,
      iconSize: [25, 41],    // size of the icon
      iconAnchor: [12, 41],  // point of the icon which corresponds to marker's location
      popupAnchor: [1, -34], // where popups should open relative to the icon
      shadowSize: [41, 41],  // size of the icon shadow
    });

    // Initialize the map when component mounts
    const initMap = () => {
      // Create map centered roughly on the world with zoom level 2
      map = L.map('map', {
        zoomControl: true,
        minZoom: 1,
        maxZoom: 18,
        worldCopyJump: true, // helps when dragging map near edges
      }).setView([20, 0], 2);

      // Add OpenStreetMap tiles as the base map layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Add markers for chargers passed in as props
      addMarkers(props.chargers);
    };

    // Function to add markers for each charger on the map
    // Clears previous markers before adding new ones
    const addMarkers = (chargers) => {
      // Remove all existing markers from the map
      markers.value.forEach(marker => map.removeLayer(marker));
      markers.value = [];

      chargers.forEach(charger => {
        // Check that charger has valid latitude and longitude before adding marker
        if (charger.location?.lat && charger.location?.lng) {
          const marker = L.marker([charger.location.lat, charger.location.lng], {
            icon: redIcon, // use our custom red marker icon
          }).addTo(map);

          // Bind a popup with charger details that shows on click
          marker.bindPopup(`
            <strong>${charger.name}</strong><br/>
            Status: ${charger.status}<br/>
            Connector: ${charger.connectorType}<br/>
            Power: ${charger.powerOutput} kW
          `);

          // Keep track of the marker so we can remove/update it later
          markers.value.push(marker);
        }
      });
    };

    // Initialize map once the component is mounted to DOM
    onMounted(() => {
      initMap();
    });

    // Watch for changes in the chargers prop to update markers dynamically
    watch(
      () => props.chargers,
      (newChargers) => {
        addMarkers(newChargers);
      }
    );

    return {};
  },
};
</script>

<style scoped>
/* Ensure the map container fills the available width and has a fixed height */
#map {
  width: 100%;
  height: 500px;
}
</style>
