import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  await page.goto('http://localhost:1234/', { waitUntil: 'networkidle0' });

  const transforms = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[transform]')).map(el => ({
      tagName: el.tagName,
      className: el.className,
      transform: el.getAttribute('transform'),
      html: el.outerHTML.substring(0, 100)
    }));
  });

  console.log('Elements with transform attribute:', transforms);
  await browser.close();
})();