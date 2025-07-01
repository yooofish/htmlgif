import { Router, Request, Response } from 'express';
import { HtmlToGifService } from '../services/HtmlToGifService';

const router = Router();
const htmlToGifService = new HtmlToGifService();

// 获取URL内容
router.post('/fetch-url', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL不能为空' });
    }

    console.log('开始获取URL内容:', url);

    const html = await htmlToGifService.fetchUrlContent(url);
    
    res.json({ html });

  } catch (error) {
    console.error('获取URL失败:', error);
    res.status(500).json({ 
      error: '获取URL失败', 
      details: error instanceof Error ? error.message : '未知错误' 
    });
  }
});

// 转换HTML为GIF
router.post('/convert', async (req: Request, res: Response) => {
  try {
    const { html, options } = req.body;
    
    if (!html) {
      return res.status(400).json({ error: 'HTML内容不能为空' });
    }

    const gifOptions = {
      width: options?.width || 800,
      height: options?.height || 600,
      fps: options?.fps || 10,
      duration: options?.duration || 3000,
      quality: options?.quality || 10,
      ...options
    };

    console.log('开始转换HTML为GIF...', { 
      width: gifOptions.width, 
      height: gifOptions.height, 
      fps: gifOptions.fps,
      duration: gifOptions.duration 
    });

    const gifBuffer = await htmlToGifService.convertHtmlToGif(html, gifOptions);
    
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Content-Disposition', 'attachment; filename="animation.gif"');
    res.send(gifBuffer);

  } catch (error) {
    console.error('转换失败:', error);
    res.status(500).json({ 
      error: '转换失败', 
      details: error instanceof Error ? error.message : '未知错误' 
    });
  }
});

// 预览HTML（返回截图）
router.post('/preview', async (req: Request, res: Response) => {
  try {
    const { html, width = 800, height = 600 } = req.body;
    
    if (!html) {
      return res.status(400).json({ error: 'HTML内容不能为空' });
    }

    const screenshot = await htmlToGifService.takeScreenshot(html, { width, height });
    
    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);

  } catch (error) {
    console.error('预览失败:', error);
    res.status(500).json({ 
      error: '预览失败', 
      details: error instanceof Error ? error.message : '未知错误' 
    });
  }
});

export { router as htmlToGifRouter }; 