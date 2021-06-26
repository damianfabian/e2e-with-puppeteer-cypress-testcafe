const { expect } = require('chai');
const { describe, it } = require('mocha');
const puppeteer = require('puppeteer');

let browser;

describe('Setup Testing', () => {
    afterEach(async () => {
		await browser.close();
    })
    
	it('Camera renders with Fake video', async () => {
		browser = await puppeteer.launch({
			args: [
                '--allow-file-access-from-files',
				`--use-fake-device-for-media-stream`,
				`--use-fake-ui-for-media-stream`,
			],
			headless: false,
		});
		const page = await browser.newPage();
		await page.goto('http://localhost:3000', {
            waitUntil: 'domcontentloaded'
        });

    
        expect(await page.$eval('#camera', el => el.srcObject)).to.be.null
		await delay(500);
        expect(await page.$eval('#camera', el => el.srcObject)).to.not.be.null

	});

    it('Camera does not render without permissions', async () => {
		browser = await puppeteer.launch({
			args: [
                '--allow-file-access-from-files',
			],
			headless: false,
		});
		const page = await browser.newPage();
		await page.goto('http://localhost:3000', {
            waitUntil: 'domcontentloaded'
        });

    
        expect(await page.$eval('#camera', el => el.srcObject)).to.be.null
		await delay(500);
        expect(await page.$eval('#camera', el => el.srcObject)).to.be.null

	});
});

const delay = (time) => new Promise((res) => setTimeout(() => res(), time));
