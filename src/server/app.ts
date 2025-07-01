import express from 'express';
import cors from 'cors';
import path from 'path';
import { htmlToGifRouter } from './routes/htmlToGif';
import { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// 全局请求日志
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// 中间件
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API路由
app.use('/api/html-to-gif', htmlToGifRouter);

// 静态文件服务
app.use(express.static(path.join(__dirname, '../public')));

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 前端路由处理
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 全局错误捕获
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('全局错误:', err);
  res.status(500).json({ error: '服务器内部错误', details: err?.message || err });
});

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📝 API文档: http://localhost:${PORT}/api/health`);
});

export default app; 