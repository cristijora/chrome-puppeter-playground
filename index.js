const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const fs = require('fs');

(async () => {
  const baseUrl = 'https://cristijora.github.io/paper-dashboard-pro/#/'
  const sizes = [{width: 1920, height: 1200}, {width: 800, height: 600}, {width: 414, height: 714}]
  const deviceKeys = ['iPhone 6', 'iPhone 6 landscape', 'iPhone 6 landscape', 'iPad', 'iPad landscape', 'iPad Pro', 'iPad Pro landscape'];
  const pages = ['admin/overview', 'admin/stats']
  const browser = await puppeteer.launch();
  console.time('flow1');
  var toExecute = []
  for(let device of deviceKeys){
    toExecute.push(flow1(device,`${baseUrl}admin/overview`, 'overview'))
  }

  await Promise.all(toExecute)

  async function flow1(device, sitePage, screenName) {
    console.log(`Generating screens for ${device}`)
    const page = await browser.newPage();
    await page.emulate(devices[device])
    await page.goto(sitePage)
    let pictureName = `${device}/${screenName}`
    if(!fs.existsSync(`./${device}`)){
      fs.mkdirSync(device)
    }
    await page.screenshot({path: `${pictureName}-1.png`});
    page.click('.navbar-toggle')
    await page.waitFor(200)
    await page.screenshot({path: `${pictureName}-2.png`});
    page.click('.nav li .ti-package')
    await page.waitFor(50)
    await page.screenshot({path: `${pictureName}-3.png`});
    page.click('a[href$="components/buttons"]')
    await page.waitFor(100)
    await page.screenshot({path: `${pictureName}-4.png`});
    await page.click('.main-panel')
    await page.waitFor(200)
    await page.screenshot({path: `${pictureName}-5.png`, omitBackground : true});
  }

  browser.close();
  console.timeEnd('flow1');
})();