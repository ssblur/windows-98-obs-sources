import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import puppeteer from 'puppeteer';
import path, { format } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const durationInSeconds = 60;

const browser = await puppeteer.launch({
    defaultViewport: {
        width: 1400,
        height: 1000,
    },
    args: ['--autoplay-policy=no-user-gesture-required'],
})
const page = await browser.newPage()

const file = path.join(__dirname, "index.html")
await page.goto(`file:///${file}`)

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
await wait(1000)

const recorder = new PuppeteerScreenRecorder(page, {
  followNewTab: false,
  fps: 30,
  videoFrame: {
    width: 1200,
    height: 900
  },
  videoCrf: 15,
  videoCodec: 'libx264',
  videoPreset: 'ultrafast',
  videoBitrate: 1000,
  autopad: {
    color: 'black' | '#35A5FF',
  },
})
await recorder.start("./schedule.mp4")
await wait(durationInSeconds * 1000)
await recorder.stop()
await browser.close()