import express from 'express';
import {
  getAllCars,
  searchCars,
  startParsing,
  getStatistics,
  deleteCar,
  deleteAllCars
} from '../controllers/carController.js';

const router = express.Router();

router.get('/cars', getAllCars);
router.get('/cars/search', searchCars);
router.get('/cars/statistics', getStatistics);
router.post('/parse', startParsing);
router.delete('/cars/:id', deleteCar);
router.delete('/cars', deleteAllCars);

export default router;
