import assert from 'node:assert/strict'
// node scripts/check-preview.mjs <URL> (set PLAYWRIGHT_MODULE when playwright is not installed here)
const pw = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const { chromium } = pw.default ?? pw
const url = process.argv[2] || 'http://127.0.0.1:5173'
const browser = await chromium.launch()
const noOverflow = (p) => p.evaluate(() => document.documentElement.scrollWidth <= innerWidth)

for (const [device, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const touch = device === 'mobile'
  const ctx = await browser.newContext({ viewport: { width, height }, hasTouch: touch, isMobile: touch })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(url)
  await page.waitForTimeout(3500)
  assert.match(await page.locator('.hero-hi').innerText(), /Oi,\s+eu sou Rougger/)
  assert.equal(await page.locator('h1').count(), 1)
  assert.ok(await noOverflow(page), `${device}: overflow`)

  // every row is closed at rest; only the cursor opens one
  const rows = page.locator('.row')
  const total = await rows.count()
  assert.equal(await page.locator('.works-title sup').innerText(), String(total))
  const opacities = () => page.$$eval('.row-band', (e) => e.map((x) => getComputedStyle(x).opacity))
  await page.mouse.move(2, 2)
  await page.waitForTimeout(700)
  assert.deepEqual(await opacities(), Array(total).fill('0'), `${device}: a row is open at rest`)
  if (!touch) {
    await rows.nth(1).hover()
    await page.waitForTimeout(700)
    assert.deepEqual((await opacities()).map((o, i) => [i, o]).filter(([, o]) => o === '1').map(([i]) => i), [1])
  }

  // the click opens the photo and lands on the case, with the copy removed
  const href = await rows.nth(1).getAttribute('href')
  await rows.nth(1).scrollIntoViewIfNeeded()
  await (touch ? rows.nth(1).tap() : rows.nth(1).click())
  await page.waitForTimeout(300)
  assert.equal(await page.locator('.morph').count(), 1, `${device}: no opening photo`)
  await page.waitForTimeout(2000)
  assert.equal(new URL(page.url()).pathname, href)
  assert.equal(await page.locator('.morph').count(), 0, `${device}: opening photo left behind`)
  assert.equal(await page.locator('h1').count(), 1)
  assert.ok(await noOverflow(page), `${device}: case overflow`)
  assert.equal(await page.locator('#contact h2').innerText(), 'Vamos conversar')

  await page.locator('.case-nav a').first().click()
  await page.waitForTimeout(2200)
  assert.ok((await page.evaluate(() => document.getElementById('index').getBoundingClientRect().top)) < 80, `${device}: back misses the index`)
  assert.deepEqual(errors, [], `${device}: runtime errors`)
  await ctx.close()
}

const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
await reduced.goto(url)
await reduced.waitForTimeout(400)
assert.equal(await reduced.locator('h1 .mask > span').first().evaluate((e) => getComputedStyle(e).transform), 'none')
await reduced.locator('.row').first().click()
await reduced.waitForTimeout(400)
assert.match(reduced.url(), /\/projeto\//)
assert.equal(await reduced.locator('.morph').count(), 0)
await browser.close()
console.log('ok')
