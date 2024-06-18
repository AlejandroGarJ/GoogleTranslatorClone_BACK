/* eslint-disable no-unused-vars */
import { Spinner } from '@topcli/spinner';
import { getLanguages } from './translateText.mjs';
import fs from 'fs';

const spinner = new Spinner().start('Saving languages at languages.json');
const languagesJSON = await getLanguages();
fs.writeFileSync('languages.json', JSON.stringify(languagesJSON));
spinner.succeed('Languages saved');
