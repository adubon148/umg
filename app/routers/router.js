
let express = require('express');
let router = express.Router();
 
const canciones = require('../controllers/controller.js');

router.post('/api/canciones/crear', canciones.create);
router.get('/api/canciones/all', canciones.retrieveAllCustomers);
router.get('/api/canciones/onebyid/:id', canciones.getCustomerById);
router.put('/api/canciones/update/:id', canciones.updateById);
router.delete('/api/canciones/delete/:id', canciones.deleteById);

module.exports = router;