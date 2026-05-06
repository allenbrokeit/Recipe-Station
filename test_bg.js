import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  await page.goto('http://localhost:1234/', { waitUntil: 'networkidle0' });

  // Check Metric button background
  let bg = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(e => e.textContent === 'Metric');
    return window.getComputedStyle(btn).backgroundColor;
  });
  console.log('Metric background before click:', bg);

  // Click Metric button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(e => e.textContent === 'Metric');
    if (btn) btn.click();
  });

  await new Promise(r => setTimeout(r, 500));

  bg = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(e => e.textContent === 'Metric');
    return window.getComputedStyle(btn).backgroundColor;
  });
  console.log('Metric background after click:', bg);

  await browser.close();
})();