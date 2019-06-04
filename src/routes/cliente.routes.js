module.exports = (app) => {
    const clientes = require('../controllers/cliente.controller.js');

    // Criar um novo cliente
    app.post('/clientes', clientes.create);

    // Obter todos os clientes
    app.get('/clientes', clientes.findAll);

    // Obter um único cliente pelo ID
    app.get('/clientes/:clienteId', clientes.findOne);

    // Obter os clientes pelo texto (nome ou email)
    app.get('/clientes/texto/:clienteTexto', clientes.findByTexto);

    // Alterar o cliente pelo ID
    app.put('/clientes/:clienteId', clientes.update);

    // Apagar o cliente pelo ID
    app.delete('/clientes/:clienteId', clientes.delete);
}