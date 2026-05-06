import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  await page.goto('http://localhost:1234/', { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    // Look up the Metric button DOMQL node
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(e => e.textContent === 'Metric');
    if (btn && btn.__element) {
      console.log('el.state:', JSON.stringify(btn.__element.state.parse ? btn.__element.state.parse() : btn.__element.state));
    } else {
      console.log('Metric btn node not found or __element missing');
    }
  });

  await browser.close();
})();