var express = require('express');
var router = express.Router();
var contratoController = require('../controllers/contratosController'); // Certifique-se de que o caminho para o controller esteja correto

// GET: Devolve a lista de todos os contratos
router.get('/contratos', function(req, res) {
  if (req.query.entidade) {
    contratoController.findByEntity(req.query.entidade)
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: err.message }));
  } else if (req.query.tipo) {
    contratoController.findByProcedureType(req.query.tipo)
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: err.message }));
  } else {
    contratoController.list()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: err.message }));
  }
});

// GET: Devolve a lista de entidades comunicantes ordenada alfabeticamente e sem repetições
router.get('/contratos/entidades', function(req, res) {
  contratoController.listEntities()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET: Devolve a lista dos tipos de procedimento ordenada alfabeticamente e sem repetições
router.get('/contratos/tipos', function(req, res) {
  contratoController.listProcedureTypes()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET: Devolve o registro com identificador id
router.get('/contratos/:id', function(req, res) {
  contratoController.findById(req.params.id)
    .then(data => {
      if (data) {
        res.json(data); // Retorna os dados se encontrados
      } else {
        res.status(404).json({ error: 'Contrato não encontrado' }); // Retorna erro se nada foi encontrado
      }
    })
    .catch(err => res.status(500).json({ error: err.message })); // Trata erro de execução
});

// POST: Acrescenta um registro novo à BD
router.post('/contratos', function(req, res) {
  contratoController.insert(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE: Elimina da BD o registro com o identificador id
router.delete('/contratos/:id', function(req, res) {
  contratoController.delete(req.params.id)
    .then(data => res.status(204).send())
    .catch(err => res.status(500).json({ error: err.message }));
});

// PUT: Altera o registro com o identificador id
router.put('/contratos/:id', function(req, res) {
  contratoController.update(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
