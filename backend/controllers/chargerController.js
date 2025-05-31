const Charger = require('../models/Charger');

// Create a new charger entry
exports.createCharger = async (req, res) => {
  // Grab these fields from the request body
  const { name, location, status, powerOutput, connectorType } = req.body;
  
  // TODO: We should add proper validation here to make sure required fields exist and are valid
  
  try {
    // Make a new Charger document with the info provided
    const newCharger = new Charger({ name, location, status, powerOutput, connectorType });
    
    // Save it to the database
    await newCharger.save();
    
    // Send back the newly created charger with 201 Created status
    res.status(201).json(newCharger);
  } catch (err) {
    // Something went wrong, log it for debugging
    console.error('Create charger error:', err);
    
    // Return a generic server error message to client
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all chargers from the database
exports.getChargers = async (req, res) => {
  try {
    // Just fetch all chargers with no filter
    const chargers = await Charger.find();
    
    // Send them back as JSON
    res.json(chargers);
  } catch (err) {
    console.error('Get chargers error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update an existing charger by ID
exports.updateCharger = async (req, res) => {
  // Extract the charger ID from URL params
  const { id } = req.params;
  
  // And updated fields from the request body
  const { name, location, status, powerOutput, connectorType } = req.body;

  try {
    // Try to find and update the charger with new info
    // `new: true` returns the updated doc
    // `runValidators: true` enforces schema validation on update
    const updatedCharger = await Charger.findByIdAndUpdate(
      id,
      { name, location, status, powerOutput, connectorType },
      { new: true, runValidators: true }
    );
    
    // If no charger was found, tell the client
    if (!updatedCharger) {
      return res.status(404).json({ message: 'Charger not found' });
    }
    
    // Otherwise, send back the updated charger data
    res.json(updatedCharger);
  } catch (err) {
    console.error('Update charger error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a charger by ID
exports.deleteCharger = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Try to delete charger by ID
    const deleted = await Charger.findByIdAndDelete(id);
    
    // If none found, respond accordingly
    if (!deleted) {
      return res.status(404).json({ message: 'Charger not found' });
    }
    
    // Success — respond with 204 No Content since nothing needs to be sent back
    res.status(204).send();
  } catch (err) {
    console.error('Delete charger error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
