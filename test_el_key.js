import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  await page.goto('http://localhost:1234/', { waitUntil: 'networkidle0' });

  // Expose el.key by adding it as a data attribute or just reading it from window.
  await page.evaluate(() => {
    // DOMQL stores elements in DOM node properties, but we can't easily access them from raw DOM.
    // Let's just log the DOM node's class name, etc.
  });

  await browser.close();
})();