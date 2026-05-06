import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

  await page.goto('http://localhost:1234/', { waitUntil: 'networkidle0' });

  // Get the current text of the yield value
  let yieldValue = await page.evaluate(() => {
    // Value has fontWeight bold, and text is 4
    const elems = Array.from(document.querySelectorAll('*'));
    const valueEl = elems.find(e => e.textContent === '4' && e.tagName !== 'SCRIPT');
    return valueEl ? valueEl.textContent : 'Not found';
  });
  console.log('Initial Yield:', yieldValue);

  let incBtnFound = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, div, span'));
    const incBtn = btns.find(e => e.textContent === '+' && e.tagName !== 'SCRIPT');
    if (incBtn) {
      incBtn.click();
      return true;
    }
    return false;
  });

  console.log('Increment button found and clicked:', incBtnFound);

  // Wait a bit
  await new Promise(r => setTimeout(r, 500));

  yieldValue = await page.evaluate(() => {
    const elems = Array.from(document.querySelectorAll('*'));
    // we want to find the yield element, maybe it's 5 now
    const valueEl = elems.find(e => e.textContent === '5' && e.tagName !== 'SCRIPT');
    return valueEl ? valueEl.textContent : 'Still 4 or not found';
  });
  console.log('Yield after click:', yieldValue);

  await browser.close();
})();