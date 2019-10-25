module.exports = (app) => {
    const grupos = require('../controllers/grupo.controller.js');

    // Cria um novo grupo
    app.post('/grupos', grupos.incluir)

    // Lista todos os grupos
    app.get('/grupos', grupos.listarTodos)

    // Obtém um único grupo pelo ID
    app.get('/grupos/:grupoId', grupos.listarPeloId)
    
    // Altera o grupo pelo ID
    app.put('/grupos/:grupoId', grupos.alterar)

    // Apaga um grupo pelo ID
    app.delete('/grupos/:grupoId', grupos.apagar)
}