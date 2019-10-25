module.exports = (app) => {
    const produtos = require('../controllers/produto.controller.js');

    // Cria um novo produto
    app.post('/produtos', produtos.incluir)

    // Lista todos os produtos
    app.get('/produtos', produtos.listarTodos)

    // Obtém um único produto pelo ID
    app.get('/produtos/:produtoId', produtos.listarPeloId)

    // Obtem o produto pelo texto (nome, descrição ou código de barras)
    app.get('/produtos/texto/:produtoTexto', produtos.listarPeloTexto)

    // Altera o produto pelo ID
    app.put('/produtos/:produtoId', produtos.alterar)

    // Apaga um produto pelo ID
    app.delete('/produtos/:produtoId', produtos.apagar)
}