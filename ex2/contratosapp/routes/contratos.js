var express = require('express');
var axios = require('axios')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:16000/contratos")
  .then(resp =>{
      contratos = resp.data
      res.status(200).render("ContratosListPage", {"lComp": contratos, "date": d})
  })
  .catch(erro => {
      res.status(502).render("error", {"error": erro})
  })
});

router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:16000/contratos")
    .then(resp => {
      let maxIdNum = 0;
      resp.data.forEach(contrato => {
        const idNum = parseInt(contrato.id);
        if (idNum > maxIdNum) {
          maxIdNum = idNum;
        }
      });
      const newId = maxIdNum + 1;
      res.render("ContratoFormPage", { "nid": newId, "date": d});
    })
    .catch(erro => {
      next(erro);
    });
});

router.get('/:idContrato', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idContrato
  axios.get("http://localhost:16000/contratos" +id)
  .then(resp =>{
    contrato = resp.data
      res.status(200).render("contratoPage", {"contrato": contrato, "date": d})
  })
  .catch(erro => {
      res.status(503).render("error", {"error": erro})
  })
});

module.exports = router;
