/* eslint-disable no-unused-vars */
import puppeteer from 'puppeteer';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: './.env' });
export async function getTranslation(inputLanguage, textToTranslate, language) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.NODE_ENV === 'production'
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath()
  });
  const page = await browser.newPage();

  textToTranslate = textToTranslate.replace(/ /g, '+') + '&op';

  await page.goto(`https://translate.google.com/?hl=es&sl=${inputLanguage}&tl=${language}&text=${textToTranslate}=translate`);

  await page.waitForSelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.XWZjwc');
  await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.XWZjwc');

  await page.waitForSelector('.ryNqvb');
  const text = await page.evaluate(() => {
    let concatText = '';
    document.querySelectorAll('.ryNqvb').forEach(textContainer => {
      concatText += textContainer.innerText;
    });
    return concatText;
  });
  await browser.close();
  return text;
}

export async function getLanguages() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://translate.google.com/?sl=auto&tl=es&op=translate');
  await page.waitForSelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.XWZjwc');
  await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.XWZjwc');

  await page.waitForSelector('.zQ0atf');
  await page.click('.zQ0atf');

  const elementos = await page.$$('.qSb8Pe');
  const output = {};
  for (const elemento of elementos) {
    const elementoHijo = await elemento.$('.Llmcnf');
    const languageCode = await page.evaluate(el => el.getAttribute('data-language-code'), elemento);
    if (elementoHijo) {
      const texto = await page.evaluate(el => el.textContent, elementoHijo);
      output[languageCode] = texto;
    }
  }
  return output;
}
getLanguages();
