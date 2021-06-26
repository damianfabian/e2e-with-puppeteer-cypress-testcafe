import { ClientFunction, Selector } from 'testcafe';
const { expect } = require('chai');

fixture`Camera`.page`https://localhost:4000`;

const isPlaying = ClientFunction(() => {
	const video = document.querySelector('video#camera');
    return video.srcObject && video.srcObject.active
});


test('Camera renders with Fake video', async (t) => {
	let title = await Selector('h1').withText('Video Camera').nth(0);

	expect(title).to.exist;


    await delay(300);

	expect(await isPlaying()).to.be.true

    const button = await Selector('button#stop');
    await t.click(button);
    await delay(600);

    expect(await isPlaying()).to.be.false;
});

const delay = (time) => new Promise((res) => setTimeout(() => res(), time));
