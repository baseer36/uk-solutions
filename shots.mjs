import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('shots', { recursive: true });
const sites = { naqshcarpets: 'https://naqshcarpets.com', jamiaanwarululoom: 'https://jamiaanwarululoom.com', elearningayah: 'https://elearningayah.com', baseertools: 'https://baseertools.com', ukorganicspk: 'https://ukorganicspk.com' };
const browser = await chromium.launch();
for (const [key, url] of Object.entries(sites)) {
  const page = await browser.newPage({ viewport: { width: 1366, height: 854 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(5000);
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('body *')) {
        const s = getComputedStyle(el); const r = el.getBoundingClientRect();
        if ((s.position === 'fixed' || s.position === 'sticky') && r.height > 90 && r.top > 200) el.style.display = 'none';
      }
    });
    await page.screenshot({ path: 'shots/' + key + '.jpg', type: 'jpeg', quality: 72 });
    console.log('ok', key);
  } catch (e) { console.log('FAIL', key, String(e.message).split('\n')[0]); }
  await page.close();
}
await browser.close();
