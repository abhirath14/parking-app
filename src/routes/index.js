const app = require('express');
const router = app.Router();
const managerController = require('../controllers/manager/index');
const userController = require('../controllers/user/index');
router.post('/add-parking-slot', managerController.addNewParkingSlot);
router.post('/book-parking-slot', userController.bookNextParkingSlots);
router.post('/unpark-vehicle-for-user', userController.unParkVehicleForUserId);
router.get('/put-slot-to-maintenance-mode', managerController.putToMaintenanceMode);
router.post('/add-user', userController.addUser);
router.get('/number-of-vehicles-parked-today', managerController.numberOfVehiclesParkedInADay);
router.get('/total-fee-collected-today', managerController.totalFeeCollectedToday);
router.get('/total-parking-time', managerController.totalParkingTime);
module.exports = router;