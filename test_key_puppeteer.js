import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:1234/', { waitUntil: 'networkidle0' });

  const steps = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h4')).map(el => el.textContent);
  });
  console.log('Instruction Steps:', steps);

  await browser.close();
})();