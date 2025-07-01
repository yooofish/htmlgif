import puppeteer, { Browser, Page } from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

interface GifOptions {
  width: number;
  height: number;
  fps: number;
  duration: number;
  quality: number;
}

interface ScreenshotOptions {
  width: number;
  height: number;
}

const GIFEncoder = require('gif-encoder-2');

export class HtmlToGifService {
  private browser: Browser | null = null;

  private async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
    }
    return this.browser;
  }

  private async createPage(): Promise<Page> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    // 设置视口为用户指定宽高
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'image') {
        req.abort();
      } else {
        req.continue();
      }
    });
    return page;
  }

  async fetchUrlContent(url: string): Promise<string> {
    const page = await this.createPage();
    try {
      await page.setDefaultNavigationTimeout(30000);
      await page.goto(url, { waitUntil: 'networkidle0' });
      const html = await page.content();
      
      return html;
    } finally {
      await page.close();
    }
  }

  async takeScreenshot(html: string, options: ScreenshotOptions): Promise<Buffer> {
    const page = await this.createPage();
    
    try {
      // 设置HTML内容
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      // 等待动画开始
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 截图
      const screenshot = await page.screenshot({
        type: 'png',
        clip: {
          x: 0,
          y: 0,
          width: options.width,
          height: options.height
        }
      });

      return screenshot as Buffer;
    } finally {
      await page.close();
    }
  }

  async convertHtmlToGif(html: string, options: GifOptions): Promise<Buffer> {
    const page = await this.createPage();
    try {
      // 注入body样式，确保和前端一致
      let htmlWithStyle = html;
      if (/<body[^>]*>/i.test(htmlWithStyle)) {
        htmlWithStyle = htmlWithStyle.replace(
          /<body([^>]*)>/i,
          `<body$1 style=\"width:100vw;height:100vh;overflow:hidden;margin:0;padding:0;display:block;\">`
        );
      } else {
        htmlWithStyle = `<body style=\"width:100vw;height:100vh;overflow:hidden;margin:0;padding:0;display:block;\">` + htmlWithStyle + `</body>`;
      }
      await page.setViewport({ width: options.width, height: options.height });
      await page.setContent(htmlWithStyle, { waitUntil: 'networkidle0' });
      await new Promise(resolve => setTimeout(resolve, 200)); // 首帧前延迟，避免黑屏
      const encoder = new GIFEncoder(options.width, options.height);
      encoder.setDelay(1000 / options.fps);
      encoder.setQuality(options.quality);
      encoder.start();
      const frameCount = Math.floor((options.duration / 1000) * options.fps);
      const frameDelay = options.duration / frameCount;
      for (let i = 0; i < frameCount; i++) {
        const screenshot = await page.screenshot({
          type: 'png',
          clip: {
            x: 0,
            y: 0,
            width: options.width,
            height: options.height
          }
        });
        const PNG = require('pngjs').PNG;
        const png = PNG.sync.read(screenshot as Buffer);
        encoder.addFrame(png.data);
        if (i < frameCount - 1) {
          await new Promise(resolve => setTimeout(resolve, frameDelay));
        }
      }
      encoder.finish();
      return encoder.out.getData();
    } finally {
      await page.close();
    }
  }

  async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
} 