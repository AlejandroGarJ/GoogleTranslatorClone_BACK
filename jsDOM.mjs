import fs from 'fs';
import { JSDOM } from 'jsdom';
import { getTranslation } from './translateText.mjs';

const filePath = './traducciones.html';
const html = fs.readFileSync(filePath, 'utf-8');

const dom = new JSDOM(html);
const document = dom.window.document;

document.addEventListener('DOMContentLoaded', async function () {
  const elements = document.querySelectorAll('*');
  const elementsWithText = [];
  const texts = [];

  // Group elements with text and their text in arrays
  for (const element of elements) {
    if (element.children.length === 0 && element.textContent.trim().length > 0) {
      const textWithoutNewlines = element.textContent.replace(/\n/g, '');
      texts.push(textWithoutNewlines);
      elementsWithText.push(element);
    }
  }

  // Debugger
  console.log(texts);
  let concatText = texts.join('§');

  concatText = await getTranslation(concatText, 'en');
  const translatedText = concatText.split('§');
  for (let x = 0; x < translatedText.length; x++) {
    elementsWithText[x].textContent = translatedText[x];
  }

  const nuevoHTML = dom.serialize();

  fs.writeFileSync(filePath, nuevoHTML, 'utf-8');
});
