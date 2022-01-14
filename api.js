import Sequalize from 'sequelize';
import express from 'express';


const app = express();
const port = 8080;
app.get('/', (req, res) => res.json(healthcheck));
app.listen(port, () => console.log(`notes-app listening on port ${port}!`));
const connection= new Sequalize('pheonix', 'root', 'Dreghiciuanca1', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql'
});

connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Stores = connection.define('Stores',{
    storesId: {
        type: Sequalize.DataTypes.INTEGER,
        primaryKey: true
    },
    name: Sequalize.DataTypes.TEXT,
    description: Sequalize.DataTypes.TEXT
},{
    timestamps: false
});

const Payments = connection.define('Payments', {
    txId: {
        type: Sequalize.DataTypes.INTEGER,
        primaryKey: true
    },
    sender: {
        type: Sequalize.DataTypes.TEXT,
        key: 'sender'
    },
    receiver: {
        type: Sequalize.DataTypes.TEXT,
        key: 'receiver'
    },
    amount: Sequalize.DataTypes.INTEGER,
    storeId: {
        type: Sequalize.DataTypes.INTEGER,
        key: 'storeId'
    },
    productId: Sequalize.DataTypes.TEXT

},{
    timestamps: false
});

const healthcheck = {
    message: 'OK'
}
connection.sync()
    .then(() => {
        console.log(`Database & tables created!`);
    });

app.get('/Stores', function(req, res) {
    Stores.findAll().then(stores => {
        res.json(stores),
        console.log(stores)
    });

});

app.get('/Stores/:id', function(req, res) {
    Stores.findAll({ where: { storesId: req.params.id } }).then(stores => res.json(stores));
});


app.get('/Payments', function(req, res) {
    Payments.findAll().then(payments => {

        res.json(payments),
            console.log(payments)
    });
});

app.get('/Payments/:id', function(req, res) {
    Payments.findAll({ where: { txId: req.params.id } }).then(payments => res.json(payments));
});

app.get('/Payments/stores/:id', function(req, res) {
    Payments.findAll({ where: { storeId: req.params.id } }).then(payments => res.json(payments));
});

app.get('/Payments/sender/:id', function(req, res) {
    Payments.findAll({ where: { sender: req.params.id } }).then(payments => res.json(payments));
});

app.get('/Payments/receiver/:id', function(req, res) {
    Payments.findAll({ where: { receiver: req.params.id } }).then(payments => res.json(payments));
});

