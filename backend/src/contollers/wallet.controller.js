const Wallet = require('../model/Wallet');
const sequelize = require('sequelize');


const getEntrances = async (req, res) => {
    try {
        const entrances = await Wallet.findAll({
            where: {
                userId: req.params.id
            },
            order: [['date', 'DESC']]
        });
        res.json(entrances)
    } catch (err) {
        console.log(`Querry Error ${err}`)
    }

};

const getEntranceByIncomes = async (req, res) => {
    try {
        const tentrance = await Wallet.findAll({
            limit: 10,
            where: {
                tentrance: 'ingreso',
                userId: req.params.id
            },
            order: [['date', 'DESC']]
        });
        res.json(tentrance);
    } catch (err) {
        console.log(`Query Error ${err}`)
    }
};

const getEntranceByExpenses = async (req, res) => {
    try {
        const tentrance = await Wallet.findAll({
            limit: 10,
            where: {
                tentrance: 'egreso',
                userId: req.params.id
            },
            order: [['date', 'DESC']]
        });
        res.json(tentrance);
    } catch (err) {
        console.log(`Query Error ${err}`)
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const entrance = await Wallet.findOne({
            where: {
                id
            }
        })
        res.json(entrance)
    } catch (err) {
        console.log(`Query Error ${err}`)
    }
};

const createEntrance = async (req, res) => {
    try {
        const { concept, entrance, tentrance } = req.body;
        const result = await Wallet.create({
            concept,
            entrance,
            tentrance,
            userId: req.params.id
        });
        res.json({
            message: "Entrance Created",
            data: result
        });
    } catch (err) {
        console.log(`Query Error ${err}`)
    }
};

const deleteEntrance = async (req, res) => {
    try {
        const entrance = await Wallet.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: 'Entrance Deleted'
        })
    } catch (err) {
        console.log(`Query Error ${err}`)
    }
};

const updateEntrance = async (req, res) => {
    try {
        const { tentrance, entrance, concept } = req.body;
        const result = await Wallet.update({
            tentrance,
            entrance,
            concept
        },
            {
                where: {
                    id: req.params.id
                }
            })
        res.json({
            message: "Entrance Updated",
            data: result
        })
    } catch (err) {
        console.log(`Query Error ${err}`)
    }
};

const sumIncomes = async (req, res) => {
    try {
        const suma = await Wallet.sum('entrance', {
            where: {
                tentrance: 'ingreso',
                userId: req.params.id
            }
        })
        res.json(suma)
    } catch (err) {
        res.json(`Error ${err}`)
    }
}

const sumExpenses = async (req, res) => {
    try {
        const suma = await Wallet.sum('entrance', {
            where: {
                tentrance: 'egreso',
                userId: req.params.id
            }
        })
        res.json(suma)
    } catch (err) {
        res.json(`Error ${err}`)
    }
}

const sumTotal = async (req, res) => {
    try {
        const sumEx = await Wallet.sum('entrance', {
            where: {
                tentrance: 'egreso',
                userId: req.params.id
            }
        })

        const sumIn = await Wallet.sum('entrance', {
            where: {
                tentrance: 'ingreso',
                userId: req.params.id
            }
        })

        if (!sumEx) {
            const total = sumIn
            res.json(total)
        } else if (!sumIn) {
            const total = -(sumEx)
            res.json(total)
        } else {
            const response = await sequelize.literal(sumIn - sumEx)
            const total = response.val
            res.json(total)
        }
    } catch (err) {
        res.json(`Error ${err}`)
    }
}


module.exports = { createEntrance, getEntrances, getEntranceByIncomes, getEntranceByExpenses, deleteEntrance, getById, updateEntrance, sumIncomes, sumExpenses, sumTotal };