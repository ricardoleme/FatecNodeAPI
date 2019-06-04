module.exports = (app) => {
    const produtos = require('../controllers/produto.controller.js');

    // Cria um novo produto
    app.post('/produtos', produtos.create);

    // Lista todos os produtos
    app.get('/produtos', produtos.findAll);

    // Obtém um único produto pelo ID
    app.get('/produtos/:produtoId', produtos.findOne);

    // Obtem o produto pelo texto (nome, descrição ou código de barras)
    app.get('/produtos/texto/:produtoTexto', produtos.findByTexto);

    // Altera o produto pelo ID
    app.put('/produtos/:produtoId', produtos.update);

    // Apaga um produto pelo ID
    app.delete('/produtos/:produtoId', produtos.delete);
}