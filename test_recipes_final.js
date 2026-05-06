import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

  await page.goto('http://localhost:1234/', { waitUntil: 'networkidle0' });

  // Check if select exists
  const hasSelect = await page.evaluate(() => {
    return !!document.querySelector('select');
  });
  console.log('Has Recipe Selector:', hasSelect);

  // Get recipe title
  let title = await page.evaluate(() => {
    return document.querySelector('h1').textContent;
  });
  console.log('Initial Title:', title);

  // Change recipe
  await page.evaluate(() => {
    const select = document.querySelector('select');
    select.value = '1'; // Select A-1 Chicken Soup
    select.dispatchEvent(new Event('input', { bubbles: true }));
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });

  await new Promise(r => setTimeout(r, 1000));

  title = await page.evaluate(() => {
    return document.querySelector('h1').textContent;
  });
  console.log('Title after change:', title);

  const ingredients = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div'))
      .filter(el => el.textContent.includes('vegetable oil'))
      .map(el => el.textContent);
  });
  console.log('Chicken Soup Ingredient found:', ingredients.length > 0);

  await browser.close();
})();
