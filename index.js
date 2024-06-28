process.env.PUPPETEER_CACHE_DIR = '/opt/render/.cache/puppeteer';

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  // ... más código de Puppeteer ...
  await browser.close();
})();
