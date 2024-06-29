import express from 'express';
import bodyParser from 'body-parser';
import { getTranslation } from './translateText.mjs';
import fs from 'fs';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// Middleware
app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(cors());

app.use(express.static('./'));

app.post('/translate', async (req, res) => {
  // Leer el contenido del archivo HTML

  try {
    const { inputLanguage, inputText, language } = req.body;

    const response = await getTranslation(inputLanguage, inputText, language);
    res.json(response);
  } catch (error) {
    res.status(500).send('Ocurrió un error procesando la solicitud');
  }
});

app.get('/languageList', async (req, res) => {
  // Leer el contenido del archivo HTML

  try {
    const response = await fs.readFileSync('./languages.json', 'utf8');
    res.json(JSON.parse(response));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server listening on localhost: ${PORT}`));
