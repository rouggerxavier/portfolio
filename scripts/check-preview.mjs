import assert from 'node:assert/strict'
import { mkdir, mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({headless:true, executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH})
const url = process.argv[2] || 'http://127.0.0.1:5173'
const screenshots = process.argv[3] || await mkdtemp(join(tmpdir(), 'rx-preview-'))
await mkdir(screenshots, {recursive:true})
const results=[]
{
  for(const [device,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
    const page=await browser.newPage({viewport:{width,height},isMobile:device==='mobile',hasTouch:device==='mobile'})
    const errors=[]
    page.on('pageerror', error=>errors.push(error.message))
    await page.goto(url, {waitUntil:'networkidle'})
    await page.evaluate(()=>document.fonts.ready)
    await page.waitForTimeout(1200)
    assert.equal(await page.locator('h1').count(),1)
    const key = await page.locator('.preview').evaluate(el => ['a', 'b', 'c'].find(key => el.classList.contains(`preview-${key}`)))
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth)
    assert.equal(overflow,false,`${key} ${device}: overflow`)
    await page.screenshot({path:`${screenshots}/${key}-${device}-hero.png`})
    if(key==='a') {
      const choices=['um site','uma landing page','uma loja','um agente de IA','um sistema']
      const slugs=['projeto-alana','mobileturismo','feirao','grankasa','fluxo-nexo']
      for(let i=0;i<choices.length;i++) {
        await page.getByRole('button',{name:choices[i],exact:true}).click()
        assert.equal(await page.getByRole('button',{name:choices[i],exact:true}).getAttribute('aria-pressed'),'true')
        assert.match(await page.locator('h1').innerText(), new RegExp(choices[i]))
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth), false)
        assert.equal(await page.locator('.selected-work .work-card').first().getAttribute('href'),`/projeto/${slugs[i]}`)
      }
      await page.getByRole('button',{name:choices[0],exact:true}).click()
    }
    if (key === 'b' && device === 'mobile') {
      const textRight = await page.locator('.maker-title > span').evaluate(el => { const range = document.createRange(); range.selectNodeContents(el); return range.getBoundingClientRect().right })
      assert.ok(textRight <= width, 'B lettering must fit the mobile viewport')
    }
    for(let y=height;y<await page.evaluate(()=>document.body.scrollHeight);y+=height*.8) { await page.evaluate(y=>window.scrollTo(0,y), y); await page.waitForTimeout(130) }
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    assert.equal(await page.locator('#contact a[href^="https://wa.me/"]').count(),1)
    const broken=await page.locator('.preview img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src))
    assert.deepEqual(broken,[],`${key} ${device}: broken images`)
    await page.evaluate(()=>window.scrollTo(0,0))
    await page.waitForTimeout(700)
    await page.screenshot({path:`${screenshots}/${key}-${device}-full.png`,fullPage:true})
    const first=page.locator(key==='c'?'.index-row':'.work-card').first()
    await first.click()
    await page.waitForTimeout(800)
    assert.match(page.url(),/\/projeto\//)
    assert.equal(await page.locator('h1').count(),1)
    await page.goBack()
    await page.waitForTimeout(800)
    await page.evaluate(()=>window.scrollTo(0,500))
    await page.waitForTimeout(300)
    assert.ok(await page.evaluate(()=>scrollY)>0,`${key}: scroll locked`)
    assert.deepEqual(errors,[],`${key} ${device}: runtime errors`)
    results.push({key,device,overflow,brokenImages:broken.length,errors:errors.length})
    await page.close()
  }
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'})
  await reduced.goto(url,{waitUntil:'networkidle'})
  assert.equal(await reduced.locator('h1').evaluate(el=>getComputedStyle(el).opacity),'1')
  assert.equal(await reduced.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
  await reduced.goto(new URL('/#contact', url).href)
  await reduced.waitForTimeout(650)
  assert.ok(await reduced.locator('#contact').evaluate(el => el.getBoundingClientRect().top < innerHeight))
  const contactLink = reduced.locator('#contact a').first()
  await contactLink.focus()
  assert.equal(await contactLink.evaluate(el => getComputedStyle(el).outlineColor), await reduced.locator('.preview-c').count() ? 'rgb(201, 61, 0)' : 'rgb(11, 11, 12)')
  await reduced.goto(new URL('/projeto/grankasa', url).href)
  await reduced.locator('a[href="/#contact"]').click()
  await reduced.waitForTimeout(900)
  assert.ok(await reduced.locator('#contact').evaluate(el => el.getBoundingClientRect().top < innerHeight))
  await reduced.close()
}
console.log(JSON.stringify(results,null,2))
await browser.close()
