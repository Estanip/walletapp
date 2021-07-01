const { Router } = require('express');
const router = Router();

const { createEntrance, getEntrances, getEntranceByIncomes, getEntranceByExpenses, deleteEntrance, getById, updateEntrance, sumIncomes, sumExpenses, sumTotal } = require('../contollers/wallet.controller');
const { verifyToken } = require('../utils/verifyToken');


router.get('/', getEntrances);
router.get('/ingresos/:id', getEntranceByIncomes);
router.get('/egresos/:id', getEntranceByExpenses);
router.post('/:id', verifyToken, createEntrance);

router.get('/get', getById);
router.delete('/delete/:id', deleteEntrance);
router.put('/update/:id', updateEntrance);

router.post('/totalingresos/:id', sumIncomes);
router.post('/totalegresos/:id', sumExpenses);
router.post('/total/:id', sumTotal);

module.exports = router;