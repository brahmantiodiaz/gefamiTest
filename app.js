
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const pseudocode1 = require('./pseudocode/soal1');
const pseudocode2 = require('./pseudocode/soal2');
const pseudocode3 = require('./pseudocode/soal3');
const pseudocode4 = require('./pseudocode/soal4');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const apiRoutes = require('./api/apiRoutes');

app.use('/api', apiRoutes);
app.get('/', (req, res) => res.render('pages/home'));
app.get('/soal1-2', (req, res) => res.render('pages/soal1_2'));
app.get('/soal3-4-5-6', (req, res) => res.render('pages/soal3_4_5_6'));
app.get('/soal7', (req, res) => res.render('pages/soal7'));
app.get('/soal8', (req, res) => res.render('pages/soal8'));
app.get('/soal9', (req, res) => res.render('pages/soal9'));
app.get('/soal10-11', (req, res) => res.render('pages/soal10-11'));
app.get('/pseudocode', (req, res) => {
  res.render('pages/pseudocode', { result: null });
});
app.post('/pseudocode', (req, res) => {
  const { soal, input } = req.body;
  let result = "";

  switch (soal) {
    case "1":
      result = pseudocode1();
      break;
    case "2":
      result = pseudocode2();
      break;
    case "3":
      result = pseudocode3(parseInt(input));
      break;
    case "4":
      result = pseudocode4(parseInt(input));
      break;
    default:
      result = "Pilihan tidak valid.";
  }

  res.render('pages/pseudocode', { result });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
