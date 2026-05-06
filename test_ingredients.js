import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:1234/', { waitUntil: 'networkidle0' });

  let ingredients = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div'))
      .filter(el => el.textContent.includes('All-Purpose Flour'))
      .map(el => el.textContent);
  });
  console.log('Initial Ingredients:', ingredients[0]);

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, div, span'));
    const incBtn = btns.find(e => e.textContent === '+' && e.tagName !== 'SCRIPT');
    if (incBtn) incBtn.click();
  });

  await new Promise(r => setTimeout(r, 500));

  ingredients = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div'))
      .filter(el => el.textContent.includes('All-Purpose Flour'))
      .map(el => el.textContent);
  });
  console.log('Ingredients after click:', ingredients[0]);

  await browser.close();
})();