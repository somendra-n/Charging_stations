const express = require('express');
const {
  createCharger,
  getChargers,
  updateCharger,
  deleteCharger
} = require('../controllers/chargerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createCharger);
router.get('/', getChargers);
router.put('/:id', updateCharger);
router.delete('/:id', deleteCharger);

module.exports = router;
