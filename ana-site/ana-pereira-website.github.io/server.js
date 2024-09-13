const express = require('express');
const app = express(); // start an express app
const port = process.env.PORT || 5503;
const path = require('path'); // window or mac
const router = express.Router();

app.use(express.static('.')); // sending static files

app.use('/', router);

app.listen(port, () => {
  console.log('App is starting at port ', port);
}); // required

router.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/sobre-mim', (request, response) => {
  response.sendFile(path.join(__dirname, 'aboutme.html'));
});

router.get('/contactos', (request, response) => {
  response.sendFile(path.join(__dirname, 'contacts.html'));
});

router.get('/faq', (request, response) => {
  response.sendFile(path.join(__dirname, 'faq.html'));
});

router.get('/consultas', (request, response) => {
  response.sendFile(path.join(__dirname, 'schedule.html'));
});

router.get('/enviado', (request, response) => {
  response.sendFile(path.join(__dirname, 'thankyou.html'));
});
router.get('/termos-e-condicoes', (request, response) => {
  response.sendFile(path.join(__dirname, 'termos_condiçoes.html'));
});

router.get('*', (req, res) => {
  res.json('Page not found');
});
