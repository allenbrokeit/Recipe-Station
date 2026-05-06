import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  await page.goto('http://localhost:1234/', { waitUntil: 'networkidle0' });

  // Click Metric button
  const metricFound = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, div, span'));
    const btn = btns.find(e => e.textContent === 'Metric' && e.tagName !== 'SCRIPT');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  console.log('Metric button found and clicked:', metricFound);

  await new Promise(r => setTimeout(r, 500));

  const ingredients = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div'))
      .filter(el => el.textContent.includes('All-Purpose Flour') || el.textContent.includes('Milk'))
      .map(el => el.textContent);
  });
  console.log('Ingredients after Metric click:', ingredients);

  await browser.close();
})();